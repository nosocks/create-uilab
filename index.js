#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { cyanBright, redBright, bold } = require('colorette')
const ejs = require('ejs')

const templates = fs.readdirSync(path.join(__dirname, 'templates'))
const questions = [
  {
    name: 'template',
    type: 'list',
    message: 'Select a template:',
    choices: templates,
  },
  {
    name: 'name',
    type: 'input',
    message: 'Project name:',
  },
  {
    name: 'componentsPath',
    type: 'input',
    message: 'Path to your components relative to the main file:',
    default: 'components'
  },
]

const createDirectoryContent = (cwd, templatePath, { projectName, componentsPath }) => {
  const skip = ['node_modules', 'pnpm-lock.yaml']
  const filesToCreate = fs.readdirSync(templatePath)
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file)
    const stats = fs.statSync(origFilePath)

    if (skip.indexOf(file) > -1) return

    try {
      if (stats.isFile()) {
        let content = fs.readFileSync(origFilePath, 'utf8')
        content = ejs.render(content, { projectName, componentsPath })
        const writePath = path.join(cwd, projectName, file)
        fs.writeFileSync(writePath, content, 'utf8')
      } else if (stats.isDirectory()) {
        fs.mkdirSync(path.join(cwd, projectName, file))
        createDirectoryContent(cwd, origFilePath, { projectName: path.join(projectName, file), componentsPath })
      }
    } catch {
      console.log(bold(redBright('there was an error creating the project :(')))
      return
    }
  })
}

inquirer.prompt(questions).then(({ template, name, componentsPath }) => {
  const cwd = process.cwd()
  let cp = componentsPath
  const templatePath = path.join(__dirname, 'templates', template)
  const targetPath = path.join(cwd, name)
  if (fs.existsSync(targetPath)) {
    console.log(bold(redBright(`Folder ${targetPath} already exists.`)))
    return
  }
  if (cp.startsWith('/')) {
    cp = cp.slice(1)
  } else if (cp.endsWith('/')) {
    cp = cp.slice(0, -1)
  }
  fs.mkdirSync(targetPath)
  createDirectoryContent(cwd, templatePath, { projectName: name, componentsPath: cp })
  console.log(
    bold(
      cyanBright(
        `🚀 Your new vite + uilab project is ready! cd into /${name}/ and install the project dependencies.`
      )
    )
  )
})

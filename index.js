#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { green, red, bold } = require('colorette')

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
]

const createDirectoryContent = (cwd, templatePath, projectName) => {
  const skip = ['node_modules', 'pnpm-lock.yaml']
  const filesToCreate = fs.readdirSync(templatePath)
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file)
    const stats = fs.statSync(origFilePath)

    if (skip.indexOf(file) > -1) return

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      const writePath = path.join(cwd, projectName, file)
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(cwd, projectName, file))
      createDirectoryContent(cwd, origFilePath, path.join(projectName, file))
    }
  })
}

inquirer.prompt(questions).then(({ template, name }) => {
  const cwd = process.cwd()
  const templatePath = path.join(__dirname, 'templates', template)
  const targetPath = path.join(cwd, name)
  if (fs.existsSync(targetPath)) {
    console.log(bold(red(`Folder ${targetPath} already exists.`)))
    return
  }
  fs.mkdirSync(targetPath)
  createDirectoryContent(cwd, templatePath, name)
  console.log(
    bold(
      green(
        `🚀 Your new vite + uilab project is ready! cd into /${name}/ and install the project dependencies.`
      )
    )
  )
})

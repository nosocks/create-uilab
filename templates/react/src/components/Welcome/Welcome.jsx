const Welcome = ({ greeting = 'hey', name = 'you' }) => (
  <div
    style={{
      padding: '2rem',
      backgroundColor: '#e0e7ff',
      maxWidth: '20rem',
      borderRadius: '0.5rem',
      userSelect: 'none',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}
  >
    <h1
      style={{
        color: '#312e81',
        fontSize: '4rem',
        fontWeight: 'bold',
        lineHeight: 1,
      }}
    >
      {`${greeting} ${name}.`}
    </h1>
  </div>
)

export default Welcome

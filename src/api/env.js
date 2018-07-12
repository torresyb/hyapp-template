let env = {
  dev: 'http://127.0.0.1:9093',
  build: 'http://192.168.184.25:9093'
}

const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? env.dev : env.build
}

export default getBaseUrl

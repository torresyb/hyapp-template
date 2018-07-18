let env = {
  dev: 'http://localhost:8080',
  build: 'http://192.168.184.25:9093'
}

export const getUrl = url => {
  return process.env.NODE_ENV === 'development' ? (env.dev + url) : (env.build + url)
}

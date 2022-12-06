import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
describe('Test responses query parameters', () => {
  it('Test query parameters', async () => {
    const response = await request.get(
      '/?filename=website.jpg&width=100&height=100'
    )
    expect(response.status).toBe(200)
  })
})
describe('Test responses converting image', () => {
  it('Test that the image does not exist', async () => {
    const response = await request.get('/images/output/1000_500_website.jpg')
    expect(response.status).toBe(404)
  })
  it('Test converting image', async () => {
    const converting = await request.get(
      '/?filename=website.jpg&width=1000&height=500'
    )
    expect(converting.status).toBe(200)
  })
  it('Test that the image does not exist', async () => {
    const converting = await request.get('/images/output/1000_500_website.jpg')
    expect(converting.type).toBe('image/jpeg')
  })
})

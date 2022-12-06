/* eslint-disable prettier/prettier */
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
const PORT = process.env.PORT || 3000
import sharp from 'sharp'
import path from 'path'
const inputpath = './images/input/'
const outputpath = './images/output/'
let outputFile = ''
let responseText = ''
const filename = ''
const width = 0
const height = 0
const app: Application = express()
app.use(morgan('dev'))
app.use(express.static('public'))
app.use('/images', express.static('images'))
const convert = async (
  filename: string,
  width: number,
  height: number,
  res: Response
) => {
  const inFile = await fs.existsSync(`${inputpath}${filename}`)
  outputFile = `${width}_${height}_${filename}`
  const outFile = await fs.existsSync(`${outputpath}${outputFile}`)
  if (!inFile || !(width > 0) || !(height > 0)) {
    responseText = 'image has failed to process or does not exist'
    res.json({ massage: responseText })
  } else if (outFile) {
    setTimeout(() => {
      res.sendFile(path.join(__dirname, '../images/output', `${outputFile}`))
    }, 1000)
  } else {
    sharp(`${inputpath}${filename}`)
      .resize(Number(width), Number(height))
      .toFile(`${outputpath}${outputFile}`)
    setTimeout(() => {
      res.sendFile(path.join(__dirname, '../images/output', `${outputFile}`))
    }, 1000)
  }
}
app.get('/', async (req: Request, res: Response) => {
  (filename as string as unknown) = req.query['filename']
  ;(width as number as unknown) = req.query['width']
  ;(height as number as unknown) = req.query['height']
  await convert(filename, width, height, res)
})
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})
export default app


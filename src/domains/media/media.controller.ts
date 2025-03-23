import { Controller, Post, Request, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { CloudinaryService } from 'domains/cloudinary/cloudinary.service'
import { createMulterOptions } from 'domains/media/multer.options'
import { Request as RequestType } from 'express'

const LIMIT_UPLOAD_SINGLE_FILE = 4 * 1024 * 1024 // 4MB
const MAX_COUNT_UPLOAD_MULTIPLE_FILE = 10
const LIMIT_UPLOAD_MULTIPLE_FILE = MAX_COUNT_UPLOAD_MULTIPLE_FILE * LIMIT_UPLOAD_SINGLE_FILE

@Controller('media')
export class MediaController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/single')
  @ResponseMessage('Upload hình ảnh thành công')
  @UseInterceptors(FileInterceptor('file', createMulterOptions(LIMIT_UPLOAD_SINGLE_FILE)))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req: RequestType) {
    const res = await this.cloudinaryService.uploadFile(file, req)
    return {
      result: res.secure_url
    }
  }

  @Post('upload/multiple')
  @ResponseMessage('Upload danh sách hình ảnh thành công')
  @UseInterceptors(
    FilesInterceptor('files', MAX_COUNT_UPLOAD_MULTIPLE_FILE, createMulterOptions(LIMIT_UPLOAD_MULTIPLE_FILE))
  )
  async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req: RequestType) {
    const urls = await this.cloudinaryService.uploadFiles(files, req)
    return {
      result: urls
    }
  }
}

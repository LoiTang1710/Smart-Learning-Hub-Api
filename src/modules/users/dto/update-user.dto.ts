import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// https://docs.nestjs.com/openapi/mapped-types
/**
 * PartileType trả về kiểu dữ liệu Class với tất cả các trường thuộc tính nằm trong Create và đặt thành tuỳ chọn (Optional)
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateUserDto extends PartialType(CreateUserDto) {}

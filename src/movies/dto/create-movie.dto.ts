import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator"

export class CreateMovieDto {
  @IsString()
  title: string

  @IsInt()
  @IsOptional()
  @Min(1900)
  @Max(2026)
  year?: number

  @IsBoolean()
  isSeen: boolean
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common"
import { MoviesService } from "./movies.service"
import { CreateMovieDto } from "./dto/create-movie.dto"

@Controller("movies")
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies()
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto)
  }

  @Delete()
  deleteMovie(@Body("id") id: string) {
    return this.moviesService.deleteMovie(id)
  }

  @Get("tmdb")
  async getTmdb(@Query("title") query: { title: string; year?: number }) {
    const { title, year } = query
    return await this.moviesService.getTmdb(title, year)
  }

  @Get("omdb")
  async getOmdb(@Query("title") title: string) {
    return await this.moviesService.getOmdb(title)
  }

  @Get("/preview")
  getMovie(@Query("title") title: string, @Query("year") year: number) {
    return this.moviesService.preview(title, year)
  }

  @Get("/:id")
  getMovieById(@Param("id") id: string) {
    return this.moviesService.getMovieById(id)
  }

  // @Post("/seed")
  // seed() {
  //   return this.moviesService.seed()
  // }
}

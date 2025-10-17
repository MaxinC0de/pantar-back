import { Module } from "@nestjs/common"
import { MoviesService } from "./movies.service"
import { MoviesController } from "./movies.controller"
import { OmdbModule } from "src/omdb/omdb.module"
import { TmdbModule } from "src/tmdb/tmdb.module"

@Module({
  imports: [OmdbModule, TmdbModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}

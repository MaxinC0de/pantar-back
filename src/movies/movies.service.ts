import { Injectable } from "@nestjs/common"
import { OmdbService } from "src/omdb/omdb.service"
import { PrismaService } from "src/prisma/prisma.service"
import { TmdbService } from "src/tmdb/tmdb.service"
import { CreateMovieDto } from "./dto/create-movie.dto"

@Injectable()
export class MoviesService {
  constructor(
    private omdbService: OmdbService,
    private tmdbService: TmdbService,
    private prismaService: PrismaService,
  ) {}

  async getAllMovies() {
    return await this.prismaService.movie.findMany({
      orderBy: { createdAt: "desc" },
    })
  }

  async getMovieById(id: string) {
    return await this.prismaService.movie.findUnique({ where: { id } })
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const { title, year, isSeen } = createMovieDto
    const omdb = await this.getOmdb(title)
    const tmdb = await this.getTmdb(title, year)
    const { Title, Year, Genre, Director, Writer, Actors, Ratings, Metascore } =
      omdb
    try {
      const movie = await this.prismaService.movie.create({
        data: {
          title: Title,
          year: Year,
          genre: Genre,
          director: Director,
          writer: Writer,
          actors: Actors,
          ratings: Ratings,
          metascore: Metascore,
          poster: tmdb.poster_path ?? null,
          posterWide: tmdb.backdrop_path ?? null,
          isSeen,
        },
      })
      return { message: "Movie created successfully", movie }
    } catch (err) {
      console.error(err)
      throw new Error("Failed to create movie")
    }
  }

  // update ici

  async deleteMovie(id: string) {
    try {
      return await this.prismaService.movie.delete({ where: { id } })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  getTmdb(title: string, year?: number | undefined) {
    return this.tmdbService.getTmdb(title, year)
  }

  getOmdb(title: string) {
    return this.omdbService.getOmdb(title)
  }

  async preview(title: string, year: number) {
    const omdb = await this.getOmdb(title)
    const tmdb = await this.getTmdb(title, year)
    return { omdb, tmdb }
  }

  // async seed() {
  //   const results = await Promise.allSettled(
  //     movies.map((title) => this.postMovie(title)),
  //   )

  //   results.forEach((res, i) => {
  //     if (res.status === "rejected") {
  //       console.error(
  //         `❌ "${movies[i]}" not added:`,
  //         res.reason?.message || res.reason,
  //       )
  //     }
  //   })

  //   console.log("🌱 Seed terminé")
  // }
}

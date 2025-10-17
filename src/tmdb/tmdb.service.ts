import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class TmdbService {
  private readonly apiKey: string
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiKey = this.config.get<string>("TMDB_API_KEY") ?? ""
  }

  async getTmdb(title: string, year?: number | undefined) {
    try {
      const safeTitle = encodeURIComponent(title)
      const { data } = await this.http.axiosRef.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: this.apiKey,
            query: safeTitle,
            primary_release_year: year,
          },
        },
      )
      return data.results[0]
    } catch (err) {
      console.log(err.message)
    }
  }
}

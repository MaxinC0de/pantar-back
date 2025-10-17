import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class OmdbService {
  private readonly apiKey: string
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiKey = this.config.get<string>("OMDB_API_KEY") ?? ""
  }

  async getOmdb(title: string): Promise<any> {
    try {
      const { data } = await this.http.axiosRef.get(
        `http://www.omdbapi.com/?apikey=${this.apiKey}&t=${title}`,
      )
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

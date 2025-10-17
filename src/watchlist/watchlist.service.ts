import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateDto } from "./dto/create.dto"

@Injectable()
export class WatchlistService {
  constructor(private prismaService: PrismaService) {}

  async getWatchlist() {
    return await this.prismaService.watchlist.findMany()
  }

  async addToWatchlist(dto: CreateDto) {
    console.log(dto)
    return await this.prismaService.watchlist.create({
      data: dto,
    })
  }

  async deleteFromWatchlist(id: string) {
    await this.prismaService.watchlist.delete({ where: { id } })
    return "Film supprimé avec un vraiment très grand succès"
  }
}

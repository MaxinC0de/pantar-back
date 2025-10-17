import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { WatchlistService } from "./watchlist.service"
import { CreateDto } from "./dto/create.dto"

@Controller("watchlist")
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Get()
  getWatchlist() {
    return this.watchlistService.getWatchlist()
  }

  @Post()
  addToWatchlist(@Body() dto: CreateDto) {
    return this.watchlistService.addToWatchlist(dto)
  }

  @Delete("/:id")
  deleteFromWatchlist(@Param("id") id: string) {
    return this.watchlistService.deleteFromWatchlist(id)
  }
}

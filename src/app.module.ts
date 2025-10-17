import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { MoviesModule } from "./movies/movies.module"
import { OmdbModule } from "./omdb/omdb.module"
import { TmdbModule } from "./tmdb/tmdb.module"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { WatchlistModule } from './watchlist/watchlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    OmdbModule,
    TmdbModule,
    PrismaModule,
    WatchlistModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

import { Controller, Get, Query, Param, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsFiltersDto } from "./dto/analytics-filters.dto";
import { JwtAuthGuard } from "../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("analytics")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN) // Admin-only access
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("summary")
  getSummary(@Query() filters: AnalyticsFiltersDto) {
    return this.analyticsService.getSummary(filters);
  }

  @Get("by-analytic")
  getByAnalytic(@Query() filters: AnalyticsFiltersDto) {
    return this.analyticsService.getByAnalytic(filters);
  }

  @Get(":analyticId/drilldown")
  getDrilldown(
    @Param("analyticId") analyticId: string,
    @Query() filters: AnalyticsFiltersDto,
  ) {
    return this.analyticsService.getDrilldown(analyticId, filters);
  }
}

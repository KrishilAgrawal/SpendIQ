import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Put,
  Patch,
  Request,
} from "@nestjs/common";
import { BudgetsService } from "../services/budgets.service";
import { CreateBudgetDto } from "../dto/create-budget.dto";
import { BudgetStatus, Role } from "@prisma/client";
import { JwtAuthGuard } from "../../../common/auth/jwt-auth.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/roles.decorator";

@Controller("budgets")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Request() req, @Body() dto: CreateBudgetDto) {
    return this.budgetsService.create(req.user.id, dto);
  }

  @Post(":id/revise")
  @Roles(Role.ADMIN)
  revise(
    @Request() req,
    @Param("id") id: string,
    @Body() dto: CreateBudgetDto,
  ) {
    return this.budgetsService.createRevision(id, req.user.id, dto);
  }

  @Patch(":id/approve")
  @Roles(Role.ADMIN)
  approve(@Param("id") id: string) {
    return this.budgetsService.approve(id);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  update(@Param("id") id: string, @Body() dto: CreateBudgetDto) {
    return this.budgetsService.update(id, dto);
  }

  @Get()
  findAll(
    @Query("status") status?: BudgetStatus,
    @Query("departmentId") departmentId?: string,
  ) {
    return this.budgetsService.findAll(status, departmentId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.budgetsService.findOne(id);
  }
}

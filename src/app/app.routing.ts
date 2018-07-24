import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {LoginSystemComponent} from './login-system/login-system.component'

export const AppRoutes: Routes = [{
  path: '',
  component: LoginSystemComponent
},{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: "dashboard",
      pathMatch: 'full'
    },{
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },{
      path: 'requirement',
      loadChildren: './requirement/requirement.module#RequirementModule'
    },{
      path: 'add-requirement',
      loadChildren: './add-requirement/add-requirement.module#AddRequirementModule'
    },{
      path: 'approve/approve',
      loadChildren: './approve/approve.module#ApproveModule'
    },{
      path: 'approve/approve-information',
      loadChildren: './approve-information/approve-information.module#ApproveInformationModule'
    },{
      path: 'add-approve',
      loadChildren: './add-approve/add-approve.module#AddApproveModule'
    },{
      path: 'import-development/task-management',
      loadChildren: './import-development/import-development.module#ImportDevelopmentModule'
    },{
      path: 'import-development/open-task',
      loadChildren: './open-task/open-task.module#OpenTaskModule'
    },{
      path: 'add-import-development',
      loadChildren: './add-import-development/add-import-development.module#AddImportDevelopmentModule'
    },{
      path: 'basic-data/department',
      loadChildren: './department/department.module#DepartmentModule'
    },{
      path: 'basic-data/staff',
      loadChildren: './staff/staff.module#StaffModule'
    },{
      path: 'basic-data/add-staff',
      loadChildren: './add-staff/add-staff.module#AddStaffModule'
    },{
      path: 'basic-data/division',
      loadChildren: './division/division.module#DivisionModule'
    },{
      path: 'basic-data/position',
      loadChildren: './position/position.module#PositionModule'
    },{
      path: 'basic-data/business-type',
      loadChildren: './business-type/business-type.module#BusinessTypeModule'
    },{
      path: 'basic-data/company',
      loadChildren: './company/company.module#CompanyModule'
    },{
      path: 'basic-data/add-company',
      loadChildren: './add-company/add-company.module#AddCompanyModule'
    },{
      path: 'meeting',
      loadChildren: './meeting/meeting.module#MeetingModule'
    },{
      path: 'add-meeting',
      loadChildren: './add-meeting/add-meeting.module#AddMeetingModule'
    },{
      path: 'testing',
      loadChildren: './testing/testing.module#TestingModule'
    },{
      path: 'add-testing',
      loadChildren: './add-testing/add-testing.module#AddTestingModule'
    },{
      path: 'plan/plan',
      loadChildren: './plan/plan.module#PlanModule'
    },{
      path: 'plan/add-plan',
      loadChildren: './add-plan/add-plan.module#AddPlanModule'
    },{
      path: 'plan/work-schedule',
      loadChildren: './work-schedule/work-schedule.module#WorkScheduleModule'
    },{
      path: 'plan/table-work-schedule',
      loadChildren: './table-work-schedule/table-work-schedule.module#TableWorkScheduleModule'
    },{
      path: 'develop',
      loadChildren: './develop/develop.module#DevelopModule'
    },{
      path: 'add-develop',
      loadChildren: './add-develop/add-develop.module#AddDevelopModule'
    },{
      path: 'report/employee-performance',
      loadChildren: './repoet-performance/repoet-performance.module#RepoetPerformanceModule'
    },{
      path: 'report/report-task',
      loadChildren: './report-task/report-task.module#ReportTaskModule'
    },{
      path: 'report/report-follow-plan',
      loadChildren: './report-follow-plan/report-follow-plan.module#ReportFollowPlanModule'
    },{
      path: 'report/report-requirement',
      loadChildren: './report-requirement/report-requirement.module#ReportRequirementModule'
    },{
      path: 'widget',
      loadChildren: './widget/widget.module#WidgetModule'
    },{
      path: 'basic',
      loadChildren: './components/basic/basic.module#BasicModule'
    },{
      path: 'advance',
      loadChildren: './components/advance/advance.module#AdvanceModule'
    },{
      path: 'animations',
      loadChildren: './animations/animations.module#AnimationsModule'
    },{
      path: 'forms',
      loadChildren: './components/forms/forms.module#FormsModule'
    },{
      path: 'bootstrap-table',
      loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
    },{
      path: 'data-table',
      loadChildren: './components/tables/data-table/data-table.module#DataTableModule',
    },{
      path: 'map',
      loadChildren: './map/map.module#MapModule',
    },{
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    },{
      path: 'maintenance/error',
      loadChildren: './maintenance/error/error.module#ErrorModule'
    },{
      path: 'maintenance/coming-soon',
      loadChildren: './maintenance/coming-soon/coming-soon.module#ComingSoonModule'
    },{
      path: 'user',
      loadChildren: './user/user.module#UserModule'
    },{
      path: 'crm-contact',
      loadChildren: './components/crm-contact/crm-contact.module#CrmContactModule'
    },{
      path: 'task',
      loadChildren: './components/task/task.module#TaskModule'
    },{
      path: 'editor',
      loadChildren: './components/editor/editor.module#EditorModule'
    },{
      path: 'invoice',
      loadChildren: './components/invoice/invoice.module#InvoiceModule'
    },{
      path: 'file-upload',
      loadChildren: './components/file-upload/file-upload.module#FileUploadModule'
    },{
      path: 'change-log',
      loadChildren: './change-log/change-log.module#ChangeLogModule'
    },{
      path: 'simple-page',
      loadChildren: './simple-page/simple-page.module#SimplePageModule'
    }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },{
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },{
    path: 'landing',
    loadChildren: './landing/landing.module#LandingModule'
  },{
    path: 'maintenance/offline-ui',
    loadChildren: './maintenance/offline-ui/offline-ui.module#OfflineUiModule'
  },]
},{
  path: '**',
  redirectTo: 'error/404'
}];
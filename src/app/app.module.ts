import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeroComponent } from './home-page/hero/hero.component';
import { HeaderComponent } from './home-page/header/header.component';
import { AboutComponent } from './home-page/about/about.component';
import { ValuesComponent } from './home-page/values/values.component';
import { CountsComponent } from './home-page/counts/counts.component';
import { FeaturesComponent } from './home-page/features/features.component';
import { ServicesComponent } from './home-page/services/services.component';
import { PricingComponent } from './home-page/pricing/pricing.component';
import { FaqComponent } from './home-page/faq/faq.component';
import { TeamComponent } from './home-page/team/team.component';
import { ClientsComponent } from './home-page/clients/clients.component';
import { RecentBlogPostsComponent } from './home-page/recent-blog-posts/recent-blog-posts.component';
import { ContactComponent } from './home-page/contact/contact.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { TestimonialsComponent } from './home-page/testimonials/testimonials.component';
import { AvEnginnerComponent } from './av-enginner/av-enginner.component';
import { FormsModule } from '@angular/forms';
import { AvHeaderComponent } from './av-enginner/av-header/av-header.component';
import { AvAboutComponent } from './av-enginner/av-about/av-about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, matDialogAnimations } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AvSimulatorComponent } from './av-enginner/av-simulator/av-simulator.component';
import { AvMyprofileComponent } from './av-enginner/av-myprofile/av-myprofile.component';
import { AvCalculatorComponent } from './av-enginner/av-calculator/av-calculator.component';
import { AvBtuComponent } from './av-enginner/av-btu/av-btu.component';
import { BtuCalculatorComponent } from './av-enginner/btu-calculator/btu-calculator.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AvDirectoryComponent } from './av-enginner/av-directory/av-directory.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatIconModule} from '@angular/material/icon';
import { FeedComponent } from './feed/feed.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ValuesComponent,
    CountsComponent,
    FeaturesComponent,
    ServicesComponent,
    PricingComponent,
    FaqComponent,
    TestimonialsComponent,
    TeamComponent,
    ClientsComponent,
    RecentBlogPostsComponent,
    ContactComponent,
    FooterComponent,
    LoginPageComponent,
    HomePageComponent,
    AvEnginnerComponent,
    AvHeaderComponent,
    AvAboutComponent,
    AvSimulatorComponent,
    AvMyprofileComponent,
    AvCalculatorComponent,
    AvBtuComponent,
    BtuCalculatorComponent,
    AvDirectoryComponent,
    FeedbackPageComponent,
    SpinnerComponent,
    FeedComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    QRCodeModule,
    MatListModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

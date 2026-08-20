import { Component } from '@angular/core';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Topbar } from "../../shared/topbar/topbar";
import { MobileHeader } from "../../shared/mobile-header/mobile-header";
import { BottomNav } from "../../shared/bottom-nav/bottom-nav";
@Component({
  selector: 'app-dashboard',
  standalone: true, // تأكد من وجود standalone
  imports: [Sidebar, Topbar, MobileHeader, BottomNav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
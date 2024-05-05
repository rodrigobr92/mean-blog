import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <header class="main-header">
      <h1 class="app-title">Blog</h1>
      <h2 class="page-title">{{ pageTitle }}</h2>
      <p-button class="admin-btn">Login</p-button>
    </header>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 0 16px;
        .main-header {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-radius: 8px;
          background: var(--oc-blue-9);
          padding: 8px;

          .app-title {
            order: 2;
            flex: 0 0 fit-content;
            margin: -60px 0;
            padding: 16px 24px;
            background: var(--oc-blue-0);
            border: 2px solid var(--oc-blue-1);
            color: var(--oc-blue-8);
            border-radius: 8px;
          }
          .page-title {
            flex: 1 1 auto;
            order: 1;
            color: var(--oc-blue-0);
            padding: 0 0 0 12px;
          }
          .admin-btn {
            order: 3;
            flex: 1 1 auto;
            text-align: right;
          }
        }
      }
    `,
    `
      tv-screen {
        position: relative;
        width: 50px;
        height: 40px;
        background: #333;
        border-radius: 50% / 10%;
        color: white;
        text-align: center;
        &:before {
          content: '';
          position: absolute;
          top: 10%;
          bottom: 10%;
          right: -5%;
          left: -5%;
          background: inherit;
          border-radius: 5% / 50%;
        }
      }

      .trapezoid {
        border-bottom: 40px solid #333;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        height: 0;
        width: 40px;
        border-radius: 8px;
      }

      .bubble-top {
        /* Modify size here: */
        --size: 50px;

        position: relative;
        width: var(--size);
        height: calc(var(--size) * 0.66);
        background: #333;
        border-radius: 10px;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 0;
          height: 0;
          border: calc(var(--size) * 0.13) solid transparent;
          border-bottom-color: #333;
          border-top: 0;
          margin-left: calc(var(--size) * 0.13 * -1);
          margin-top: calc(var(--size) * 0.13 * -1);
        }
      }

      .flag {
        width: 50px;
        height: 50px;
        box-sizing: content-box;
        padding-top: 15px;
        position: relative;
        background: #333;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 0;
          border-bottom: 13px solid #fff;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  pageTitle: string = 'Home';
}

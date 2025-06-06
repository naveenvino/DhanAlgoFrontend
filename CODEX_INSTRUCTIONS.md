# CODEX\_INSTRUCTIONS.md

## Project Overview

This is the frontend implementation guide for an Algo Trading application. The frontend should closely resemble the functionality of AlgoTest, specifically tailored for weekly expiry Nifty option selling strategies with hedging.

## Backend Reference

All frontend development must interact with an existing backend built using Dhan API:

* **Dhan API Documentation**: [Dhan API Docs](https://dhanhq.co/docs/v2/instruments/)
* **Existing Backend API Repository**: [trdauto GitHub Repository](https://github.com/naveenvino/trdauto.git)

Refer directly to this backend for API definitions, responses, endpoints, and data formats.

---

## Technology Stack

* **Frontend Framework**: Angular (latest stable version)
* **Component Library**: Angular Material
* **Data Visualization**: ngx-charts or ApexCharts
* **State Management**: Angular services with RxJS BehaviorSubjects, with optional NgRx for complex scenarios.

---

## Project Structure

Maintain the following modular structure in the Angular project:

```
src/app
├── dashboard               # Real-time positions and P&L
├── strategy-builder        # Define and manage trading strategies
├── orders                  # Manage placed, modified, or canceled orders
├── analytics               # Performance analytics and trade history
├── risk-management         # Margin and risk settings
├── auth                    # User authentication
├── shared                  # Common components, utilities, services
```

---

## API Interaction and Services

* Develop reusable Angular services for API communication with clearly defined HTTP methods (GET, POST, PUT, DELETE).
* Handle all backend communication errors explicitly.
* Initially, use mock data until backend integration is verified.
* Use clearly typed interfaces and models matching backend API responses.

---

## Angular Development Standards

* Adhere strictly to Angular's official [Style Guide](https://angular.io/guide/styleguide).
* Implement lazy loading for efficient application performance.
* Clearly document components, services, and models with JSDoc-style comments.
* Use RxJS operators effectively (`switchMap`, `catchError`, `mergeMap`).

---

## TradingView Integration

* Frontend should display real-time updates from backend triggered by TradingView alerts via webhook.
* Use Angular services for notifications via WebSockets or polling mechanisms.
* Clearly indicate notifications and differentiate trade-related messages (positions, margin updates, alerts).

---

## Authentication & Security

* Implement JWT-based secure authentication.
* Utilize Angular HTTP interceptors to append authorization headers.
* Handle errors globally through HTTP interceptors.

---

## Testing & Deployment

* Write unit tests with Jasmine and Karma for all Angular services/components.
* Tests should cover key interactions, API handling, and user actions.
* Prepare Docker configurations for consistent build environments.
* Set up Continuous Integration/Continuous Deployment (CI/CD) pipelines via GitHub Actions.

---

## Consistent Codex Prompt Template

Always structure your Codex queries clearly:

```
Referencing the instructions provided in CODEX_INSTRUCTIONS.md and backend API from [trdauto GitHub Repository](https://github.com/naveenvino/trdauto.git), implement an Angular [Component/Service/Feature] using Angular Material.

Functionality should include:
- [List required functionalities and backend API interactions]

Use mock data initially if backend endpoints are not ready.

Follow Angular best practices for state management, maintainability, and overall code structure.
```
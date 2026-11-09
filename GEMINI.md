# herLux (MAISON LUXE)

herLux is a high-end luxury hair boutique e-commerce platform, designed as a Telegram Mini App (TMA). It features a robust Django backend and a modern React frontend built with TanStack Start.

## Project Structure

- `backend/`: Django core with modular application logic.
- `herluxe webapp/`: Vite-powered React frontend using TanStack Router and Tailwind CSS.
- `frontend/`: (Empty/Placeholder)

## Technologies

### Backend
- **Framework:** Django 6.0.5
- **API:** Django REST Framework (DRF)
- **Database:** SQLite (Development)
- **Authentication:** Custom Telegram-based passwordless authentication using `PyJWT`.
- **Admin Theme:** `django-unfold` with a custom "Dark Gold" aesthetic.
- **Key Apps:**
    - `authentication`: Manages `TelegramUser` model.
    - `products`: Handles the product catalog, categories, and wishlists.
    - `orders`: Manages sales fulfillment and customer orders.

### Frontend
- **Framework:** React 19 (Vite)
- **Routing & State:** TanStack Router, TanStack Start, TanStack Query.
- **Styling:** Tailwind CSS 4, Radix UI primitives.
- **Integration:** Telegram Web Apps SDK (`@telegram-apps/sdk`, `@twa-dev/sdk`).
- **HTTP Client:** Axios with centralized configuration.

## Getting Started

### Backend Setup
1. Navigate to `backend/`.
2. Activate virtual environment: `.\.venv\Scripts\Activate.ps1` (Windows) or `source .venv/bin/activate` (Unix).
3. Install dependencies: `pip install -r requirements.txt`.
4. Run migrations: `python manage.py migrate`.
5. Start server: `python manage.py runserver`.
6. (Optional) Seed data: `python manage.py seed_products`.

### Frontend Setup
1. Navigate to `herluxe webapp/`.
2. Install dependencies: `npm install` or `bun install`.
3. Start development server: `npm run dev`.
4. Build for production: `npm run build`.

## Development Conventions

### API Guidelines
- Base URL: `/api/v1/`.
- Use DRF ViewSets for consistent endpoint behavior.
- Use `select_related` and `prefetch_related` in `get_queryset` to optimize for N+1 queries.
- Authentication uses a custom `Token` header: `Authorization: Token <jwt_token>`.

### Frontend Guidelines
- Use TypeScript for all components and logic.
- Prefer TanStack Router for type-safe routing.
- Shared constants are located in `src/constants/index.ts`.
- API client is centralized in `src/api/client.ts`.

### Admin Customization
- The admin dashboard is highly customized via the `UNFOLD` setting in `backend/herLuxe/settings.py`.
- Custom sidebar navigation and thematic colors (Gold palette) are defined there.

## Key URLs
- **Admin Panel:** `/admin/`
- **Product API:** `/api/v1/products/`
- **Order API:** `/api/v1/orders/`
- **Telegram Auth:** `/api/auth/telegram/` (Check `authentication` app for details)

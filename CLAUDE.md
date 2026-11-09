# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands are run from the `backend/` directory with the virtual environment active.

```bash
# Activate virtual environment (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Run development server
python manage.py runserver

# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Run tests
python manage.py test

# Run single app tests
python manage.py test apps.products.tests

# Seed products with sample data
python manage.py seed_products
```

## Architecture

**herLuxe** is a Django backend for a luxury hair boutique e-commerce platform. It uses a modular app structure under `backend/apps/`:

### Apps

- **authentication** - Custom `TelegramUser` model (AUTH_USER_MODEL) with passwordless Telegram-based auth. Uses `telegram_id` as the unique identifier.
- **products** - Product catalog with `Category` and `Product` models. ReadOnlyModelViewSet for public product listing with optimized queries via `select_related`.
- **orders** - Order management with `Order` and `OrderItem` models. Tracks status through Processing/Shipped/Delivered/Cancelled states.

### URL Structure

- `/admin/` - Django admin (styled with Unfold theme)
- `/api/v1/products/` - Product catalog endpoints (ReadOnlyViewSet at `/list`, `/categories`)
- `/api/auth/telegram/` - Telegram authentication endpoint

### Key Configuration

- Uses SQLite database (configured in settings.py)
- Custom user model: `authentication.TelegramUser`
- JWT_SECRET loaded from `.env` file
- Unfold admin theme with custom dark gold aesthetic
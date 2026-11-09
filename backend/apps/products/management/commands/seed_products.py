from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.products.models import Category, Product

class Command(BaseCommand):
    help = "Seeds the database with luxury human hair categories and products for HERLUXE."

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Starting HERLUXE inventory database seed..."))

        categories_data = ["Wigs", "Raw Bundles", "HD Closures & Frontals"]
        categories_dict = {}

        for cat_name in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slugify(cat_name)}
            )
            categories_dict[cat_name] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created Category: {cat_name}"))

        products_data = [
            {
                "category": categories_dict["Wigs"],
                "title": "HD 5x5 Glueless Closure Wig",
                "description": "Premium 100% Brazilian human hair wig. Pre-plucked with flawless ultra-thin HD lace that melts perfectly into all skin tones. Low maintenance and glueless ready.",
                "length_inches": 22,
                "lace_type": "HD 5x5 Closure",
                "price": 18500.00,
                "stock": 4,
                "primary_image_url": "https://images.unsplash.com/photo-1605497746444-ac9da58d340d?q=80&w=600&auto=format&fit=crop"
            },
            {
                "category": categories_dict["Wigs"],
                "title": "Luxury Full Frontal Straight Wig",
                "description": "Sleek, high-density bone straight luxury wig sourced ethically. Can be dyed, bleached, and styled under high heat up to 200°C.",
                "length_inches": 26,
                "lace_type": "13x4 HD Frontal",
                "price": 24000.00,
                "stock": 2,
                "primary_image_url": "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop"
            },
            {
                "category": categories_dict["Raw Bundles"],
                "title": "22\" Raw Indian Wavy Bundle",
                "description": "Single-donor raw temple hair from India with intact cuticles. Natural high-saturation luster and maximum volume that lasts up to 3-5 years with proper care.",
                "length_inches": 22,
                "lace_type": "None",
                "price": 12500.00,
                "stock": 15,
                "primary_image_url": "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600&auto=format&fit=crop"
            },
            {
                "category": categories_dict["HD Closures & Frontals"],
                "title": "Flawless HD 13x6 Ear-to-Ear Frontal",
                "description": "Real Swiss HD lace for the ultimate transparent hairline finish. Small, clean hand-tied knots for easy bleaching.",
                "length_inches": 18,
                "lace_type": "13x6 HD Frontal",
                "price": 9500.00,
                "stock": 8,
                "primary_image_url": "https://images.unsplash.com/photo-1595959183075-c1d945133630?q=80&w=600&auto=format&fit=crop"
            }
        ]

        for p_data in products_data:
            product, created = Product.objects.get_or_create(
                title=p_data["title"],
                length_inches=p_data["length_inches"],
                defaults=p_data
            )
            if created:
                self.stdout.write(f"  -> Added Product: {product.title} ({product.length_inches}\")")
            else:
                self.stdout.write(f"  -> {product.title} already exists. Skipping.")

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
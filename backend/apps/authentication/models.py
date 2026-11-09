from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class TelegramUserManager(BaseUserManager):
    def create_user(self, telegram_id, first_name=None, username=None, password=None):
        if not telegram_id:
            raise ValueError("Users must have a valid Telegram ID")
        
        user = self.model(
            telegram_id=str(telegram_id),
            first_name=first_name,
            username=username or f"tg_{telegram_id}"
        )
        
        # If a password is supplied (like creating a superuser), save it. 
        # Otherwise, keep it passwordless for standard bot users.
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
            
        user.save(using=self._db)
        return user

    def create_superuser(self, telegram_id, first_name=None, username=None, password=None):
        user = self.create_user(
            telegram_id=telegram_id, 
            first_name=first_name, 
            username=username, 
            password=password # <-- Explicitly pass the password here!
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class TelegramUser(AbstractBaseUser, PermissionsMixin):
    telegram_id = models.CharField(max_length=100, unique=True, primary_key=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    
    # Internal Permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    objects = TelegramUserManager()

    USERNAME_FIELD = 'telegram_id'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name or 'User'} ({self.telegram_id})"
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *


class CustomUserAdmin(UserAdmin):
    list_display = (
      'username',
      'email',
      'first_name',
      'last_name',
      'is_staff',
    )

    fieldsets = (
      (None, {
        'fields': ('username', 'email', 'password')
      }),
      ('Personal info', {
        'fields': ('first_name', 'last_name', 'avatar')
      }),
      ('Permissions', {
        'fields': (
          'is_active', 'is_staff', 'is_superuser',
          'groups', 'user_permissions'
        )
      }),
      ('Important dates', {
        'fields': ('last_login', 'date_joined')
      }),
    )

    add_fieldsets = (
      (None, {
        'fields': ('username', 'email', 'password1', 'password2')
      }),
      ('Personal info', {
        'fields': ('first_name', 'last_name', 'avatar')
      }),
      ('Permissions', {
        'fields': (
          'is_active', 'is_staff', 'is_superuser',
          'groups', 'user_permissions'
        )
      }),
      ('Important dates', {
        'fields': ('last_login', 'date_joined')
      }),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Competition)
admin.site.register(Team)
admin.site.register(Match)
admin.site.register(League)

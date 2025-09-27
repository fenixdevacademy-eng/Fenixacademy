from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import User

class UserProfileForm(UserChangeForm):
    """
    Form for updating user profile information
    """
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'bio', 'avatar')
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make password fields not required for profile updates
        self.fields.pop('password', None)
        
        # Add custom styling to form fields
        for field in self.fields.values():
            field.widget.attrs.update({'class': 'form-control'}) 
from allauth.account import adapter
from django import forms


def _is_email_valid(email: str) -> bool:
    return email[-10:] == "sqljoe.com"


class ValidateEmailAdapter(adapter.DefaultAccountAdapter):
    def clean_email(self, email: str) -> str:
        if not _is_email_valid(email):
            raise forms.ValidationError("Invalid email domain, contact admin.")
        return email

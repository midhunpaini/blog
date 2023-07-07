from django.contrib.auth.password_validation import validate_password
from django.core.validators import EmailValidator, ValidationError
from rest_framework import serializers
from django.core.validators import MinLengthValidator
from .models import User


class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password, MinLengthValidator(8)])
    email = serializers.EmailField(validators=[EmailValidator])
    

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_active', 'is_superuser','date_joined']
        extra_kwargs = {
            'password': {"write_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

  


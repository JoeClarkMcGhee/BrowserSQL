# Generated by Django 3.2.5 on 2021-07-05 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0003_remotedatabaseconnections_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='remotedatabaseconnections',
            name='port',
            field=models.IntegerField(max_length=4),
        ),
    ]

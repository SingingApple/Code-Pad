# Generated by Django 3.1.5 on 2021-01-12 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_auto_20210112_2010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='problem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='event.problem'),
        ),
    ]

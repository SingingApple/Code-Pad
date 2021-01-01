# Generated by Django 3.1.4 on 2021-01-01 09:32

from django.db import migrations, models
import event.validators


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='solution_input',
            field=models.FileField(upload_to='input_testcases/', validators=[event.validators.validate_text_file]),
        ),
        migrations.AlterField(
            model_name='problem',
            name='solution_output',
            field=models.FileField(upload_to='output_testcases/', validators=[event.validators.validate_text_file]),
        ),
    ]

from odoo import models, fields


class Vehicle(models.Model):
    _name = 'smart.vehicle'
    _description = 'Smart Vehicle'

    name = fields.Char(string='Vehicle Name', required=True)
    registration_no = fields.Char(string='Registration Number', required=True)
    active = fields.Boolean(default=True)

    inspection_ids = fields.One2many(
        'smart.vehicle.inspection',
        'vehicle_id',
        string='Inspections'
    )
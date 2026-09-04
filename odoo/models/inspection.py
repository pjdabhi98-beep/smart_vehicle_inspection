from odoo import models, fields


class VehicleInspection(models.Model):
    _name = 'smart.vehicle.inspection'
    _description = 'Vehicle Inspection'
    _order = 'inspection_date desc'

    vehicle_id = fields.Many2one(
        'smart.vehicle',
        string='Vehicle',
        required=True
    )

    inspection_date = fields.Date(
        string='Inspection Date',
        default=fields.Date.today,
        required=True
    )

    fuel_level = fields.Selection(
        [
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High')
        ],
        string='Fuel Level',
        default='medium'
    )

    tyre_condition = fields.Selection(
        [
            ('good', 'Good'),
            ('average', 'Average'),
            ('poor', 'Poor')
        ],
        string='Tyre Condition',
        default='good'
    )

    brake_condition = fields.Selection(
        [
            ('good', 'Good'),
            ('average', 'Average'),
            ('poor', 'Poor')
        ],
        string='Brake Condition',
        default='good'
    )

    engine_condition = fields.Selection(
        [
            ('good', 'Good'),
            ('average', 'Average'),
            ('poor', 'Poor')
        ],
        string='Engine Condition',
        default='good'
    )

    overall_status = fields.Selection(
        [
            ('safe', 'Safe'),
            ('maintenance', 'Maintenance Required'),
            ('critical', 'Critical')
        ],
        string='Overall Status',
        default='safe'
    )

    remarks = fields.Text(string='Remarks')
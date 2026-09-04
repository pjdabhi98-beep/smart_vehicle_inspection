from odoo import http
from odoo.http import request


class VehicleInspectionAPI(http.Controller):

    @http.route(
        '/api/vehicles',
        type='json',
        auth='user',
        methods=['POST'],
        csrf=False
    )
    def get_vehicles(self):
        vehicles = request.env['smart.vehicle'].search([])

        return [
            {
                'id': vehicle.id,
                'name': vehicle.name,
                'registration_no': vehicle.registration_no,
            }
            for vehicle in vehicles
        ]

    @http.route(
        '/api/inspections',
        type='json',
        auth='user',
        methods=['POST'],
        csrf=False
    )
    def get_inspections(self):
        inspections = request.env['smart.vehicle.inspection'].search([])

        return [
            {
                'id': inspection.id,
                'vehicle': inspection.vehicle_id.name,
                'date': str(inspection.inspection_date),
                'fuel': inspection.fuel_level,
                'tyres': inspection.tyre_condition,
                'brakes': inspection.brake_condition,
                'engine': inspection.engine_condition,
                'status': inspection.overall_status,
                'remarks': inspection.remarks,
            }
            for inspection in inspections
        ]
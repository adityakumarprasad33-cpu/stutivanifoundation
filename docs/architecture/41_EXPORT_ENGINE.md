# Export Engine Architecture

## Overview
The Export Engine provides abstract interfaces for transforming tabular and report data into consumable formats.

## IExportProvider
The core is an interface requiring implementations for:
- `exportToCSV(data, options)`
- `exportToExcel(data, options)`
- `exportToPDF(data, options)`

## Design Principles
- **Provider Agnostic:** The dashboard only calls `exportEngine.exportCSV()`. The underlying library (e.g., `json2csv`, `exceljs`, `jspdf`) is registered at the application bootstrap level.
- **Audit Trailing:** Export operations are tracked. `ExportOptions` enforce metadata like timestamps, title, and the active filters applied at the time of export.

import { ColDef } from "ag-grid-community";

export const gameHistoryolumnDefs: ColDef[] = [
    {
        field: 'game_type',
        headerName: 'Format',
        width: 100
    },
    {
        field: 'players',
        filter: 'agTextColumnFilter',
    },
    {
        field: 'winner',
        filter: 'agTextColumnFilter',
        width: 120
    },
    {
        field: 'moves',
        filter: 'agNumberColumnFilter',
        width: 120
    },
    {
        field: 'date',
        headerName: 'Played on',
        filter: 'agDateColumnFilter',
        width: 300
    }
]
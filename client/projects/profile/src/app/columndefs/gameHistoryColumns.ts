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
    },
    {
        field: 'moves',
        filter: 'agNumberColumnFilter',
    },
    {
        field: 'date',
        headerName: 'Registered Date',
        filter: 'agDateColumnFilter',
        width: 300
    }
]
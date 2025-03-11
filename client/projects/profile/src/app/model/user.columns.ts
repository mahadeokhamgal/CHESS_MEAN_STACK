import { ColDef } from "ag-grid-community";

export const usersColumnDef: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,    
      width: 50
    },
    {
      field: 'name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'rank',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'rating',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'email',
      filter: 'agTextColumnFilter',
      width: 400
    },
    {
      field: 'createdDate',
      headerName: 'Registered Date',
      filter: 'agDateColumnFilter'
    }
  ]
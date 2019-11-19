import React from 'react'
import { Table } from 'semantic-ui-react'

export default function TableUI ({ data, nukDistribute }) {
  return (
    <Table singleLine striped>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Contract Address</Table.HeaderCell>
          <Table.HeaderCell>Nuklear</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          data.map((item, i) => (
            <Table.Row key={i} textAlign='center'>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>{nukDistribute}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  )
}

<template>
  <b-container>
      <b-row>
        <b-col sm="6" class="bg-danger">
          hello
        </b-col>
        
        <b-col sm="6" class="bg-warning">
          hello
        </b-col>
      </b-row>

      <b-table-simple small striped bordered class="mt-2">
        <b-thead>
          <b-tr>
            <b-td>name</b-td>
            <b-td>email</b-td>
            <b-td>actions</b-td>
          </b-tr>
        </b-thead>

        <b-tbody>
          <b-tr>
            <b-td>Hamid</b-td>
            <b-td>hamid@gmail.com</b-td>
            <b-td>
              <b-button variant="danger" size="sm" class="mx-2">delete</b-button>
              <b-button variant="primary" size="sm">edit</b-button>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Hamid</b-td>
            <b-td>hamid@gmail.com</b-td>
            <b-td>
              <b-button variant="danger" size="sm" class="mx-2">delete</b-button>
              <b-button variant="primary" size="sm">edit</b-button>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>Hamid</b-td>
            <b-td>hamid@gmail.com</b-td>
            <b-td>
              <b-button variant="danger" size="sm" class="mx-2">delete</b-button>
              <b-button variant="primary" size="sm">edit</b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
  </b-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import myMixin from '@/mixins/myMixin'
export default {
  name: 'Home',
  mixins : [myMixin],
}
</script>

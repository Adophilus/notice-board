<template>
  <div class="card-body px-0 pb-2">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
      <thead>
        <tr>
        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Notice</th>
        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Content</th>
        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created</th>
        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>
          <div class="d-flex px-2 py-1">
          <div>
            <img src="/assets/material-dashboard/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user5">
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">Richard Gran</h6>
            <p class="text-xs text-secondary mb-0">richard@creative-tim.com</p>
          </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">Manager</p>
          <p class="text-xs text-secondary mb-0">Executive</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-secondary">Offline</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">04/10/21</span>
        </td>
        <td class="align-middle text-center">
          <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
          Edit
          </a>
        </td>
        </tr>
        <tr>
        <td>
          <div class="d-flex px-2 py-1">
          <div>
            <img src="/assets/material-dashboard/img/team-4.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user6">
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h6 class="mb-0 text-sm">Miriam Eric</h6>
            <p class="text-xs text-secondary mb-0">miriam@creative-tim.com</p>
          </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">Programator</p>
          <p class="text-xs text-secondary mb-0">Developer</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-secondary">Offline</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">14/09/20</span>
        </td>
        <td class="align-middle text-center">
          <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
          Edit
          </a>
        </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeListComponent"
}
</script>
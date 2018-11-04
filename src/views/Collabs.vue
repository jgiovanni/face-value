<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block responsive-flex">
					<div class="ui-block-title">
						<b-nav class="nav-tabs calendar-events-tabs">
							<b-nav-item :active="tabIndex === 0" @click="tabIndex = 0">Collabs</b-nav-item>
							<b-nav-item :active="tabIndex === 1" @click="tabIndex = 1">Collab Requests <span
									class="items-round-little bg-breez">{{ orderedRequests.length }}</span></b-nav-item>
						</b-nav>

						<!--<a href="#" class="more">
							<svg class="olymp-three-dots-icon">
								<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
							</svg>
						</a>-->
					</div>
				</div>
			</div>

			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<b-tabs nav-wrapper-class="hide-nav" v-model="tabIndex">
					<b-tab>
						<b-row>
							<b-col sm="6" md="6" lg="=4" xl="3">
								<div class="friend-item friend-groups create-group" data-mh="friend-groups-item">
									<b-link @click="showModal('create-friend-group-1')" class="full-block" ></b-link>
									<div class="content">
										<b-link class="btn btn-control bg-blue">
											<svg class="olymp-plus-icon">
												<use xlink:href="/svg-icons/sprites/icons.svg#olymp-plus-icon"></use>
											</svg>
										</b-link>
										<div class="author-content">
											<b-link @click="showModal('create-friend-group-1')" class="h5 author-name">Create a Collab
											</b-link>
											<!--<div class="country">6 Friends in the Group</div>-->
										</div>

									</div>

								</div>
							</b-col>
							<b-col sm="6" md="6" lg="=4" xl="3" v-for="collab in orderedCollabs" :key="collab.id">
								<div class="ui-block">
									<div class="friend-item friend-groups">
										<div class="friend-item-content">

											<!--<div class="more">
												<svg class="olymp-three-dots-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
												<ul class="more-dropdown">
													<li>
														<a href="#">Turn Off Notifications</a>
													</li>
												</ul>
											</div>-->
											<div class="friend-avatar">
												<b-link :to="`/collabs/${collab.id}`" class="author-thumb">
													<img v-if="collab.avatarURL" :src="collab.avatarURL" style="width:100%;height:100%;"
													     :alt="collab.name">
													<img v-else src="/img/logo-colored.png" style="max-width:75px;max-height:75px;"
													     alt="Face Value">
												</b-link>
												<div class="author-content">
													<b-link :to="`/collabs/${collab.id}`" class="h5 author-name">{{ collab.name }}</b-link>
													<div class="country">{{ collab.users && Object.keys(collab.users).length }} students in the group</div>
												</div>
											</div>

											<ul class="friends-harmonic">
												<li v-for="(user, key) in collab.users" :key="key" v-b-tooltip.hover :title="user.displayName">
													<b-link>
														<img :src="user.photoURL" :alt="user.displayName">
													</b-link>
												</li>
											</ul>

											<div class="control-block-button">
												<b-link :to="`/collabs/${collab.id}`" class="btn btn-control bg-primary">
													<svg class="olymp-music-play-icon-big">
														<use xlink:href="/svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
													</svg>
												</b-link>

												<b-link class="btn btn-control bg-blue" v-b-tooltip.hover title="Invite users"
												        data-toggle="modal" data-target="#create-friend-group-add-friends">
													<svg class="olymp-happy-faces-icon">
														<use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon"></use>
													</svg>
												</b-link>

												<b-link class="btn btn-control btn-grey-lighter" v-b-tooltip.hover title="Collab Settings"
												        @click="editCollab(collab)">
													<svg class="olymp-settings-icon">
														<use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon"></use>
													</svg>
												</b-link>
											</div>
										</div>
									</div>
								</div>
							</b-col>
						</b-row>
					</b-tab>
					<b-tab>
						<div class="ui-block">
							<table class="event-item-table event-item-table-fixed-width">

								<thead>

								<tr>
									<th class="author">FROM</th>
									<!--<th class="location">PLACE</th>-->
									<th class="upcoming">DATE</th>
									<!--<th class="description">DESCRIPTION</th>-->
									<th class="users">USERS</th>
									<th class="add-event"></th>
								</tr>

								</thead>

								<tbody>
								<tr class="event-item" v-for="request in orderedRequests" :key="request.id">
									<td class="author text-center">
										<div class="event-author inline-items">
											<div class="author-thumb">
												<img :src="request.from.photoURL" width="50" :alt="request.from.displayName">
											</div>
											<br>
											<div class="author-date">
												<b-link class="author-name h6">{{ request.from.displayName }}</b-link>
											</div>
										</div>
									</td>
									<!--<td class="location">
										<div class="place inline-items">
											<svg class="olymp-add-a-place-icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-add-a-place-icon"></use></svg>
											<span>Daydreamz Agency</span>
										</div>
									</td>-->
									<td class="upcoming">
										<div class="date-event inline-items align-left">
											<svg class="olymp-small-calendar-icon">
												<use xlink:href="/svg-icons/sprites/icons.svg#olymp-small-calendar-icon"></use>
											</svg>

											<span class="month">
												<timeago :datetime="getTimestamp(request.created_at)" :auto-update="300"></timeago>
											</span>

										</div>
									</td>
									<!--<td class="description">
										<p class="description">Let’s celebrate the new year together! We are organizing a big party for all
											the agency...</p>
									</td>-->
									<td class="users">
										<ul class="friends-harmonic">
											<li v-for="(user, key) in request.users" :key="key" v-b-tooltip.hover :title="user.displayName">
												<a href="#">
													<img :src="user.photoURL" width="24" :alt="user.displayName">
												</a>
											</li>
										</ul>
									</td>
									<td class="add-event">
										<b-link class="btn btn-sm btn-breez" @click="acceptCollabRequest(request)">Accept / Confirm</b-link>
										<b-link class="btn btn-sm btn-border-think custom-color c-grey" @click="declineCollabRequest(request)">Decline / Delete</b-link>
									</td>
								</tr>
								</tbody>
							</table>

						</div>
					</b-tab>
				</b-tabs>
			</div>
		</div>

		<CreateCollabModal />

		<EditCollabModal :collab="selectedCollab" />

		<InviteCollabModal :collab="selectedCollab" />
	</div>
</template>
<style lang="scss">
.hide-nav {
  display: none;
}

@media (max-width: 768px) {
  .nav-item {
    width: auto !important;
  }
  .calendar-events-tabs .nav-item + .nav-item {
    margin-left: 20px !important;
  }
}
.create-group {
  /*height: 390px;*/
  /*margin-bottom: 15px;*/
  height: calc(100% - 15px);
}
@media (min-width: 320px) {
  .create-group {
    height: 390px;
  }
}
</style>
<script type="text/javascript">
import _ from "lodash";
import { DateTime } from "luxon";
import Collab from "../mixins/collab";
import CreateCollabModal from "../components/modals/CreateCollabModal";
import EditCollabModal from "../components/modals/EditCollabModal";
import InviteCollabModal from "../components/modals/InviteCollabModal";

export default {
  name: "Collabs",
  components: { EditCollabModal, CreateCollabModal, InviteCollabModal },
  mixins: [Collab],
  data() {
    return {
      selectedCollab: null,
      activeTab: null,
      tabIndex: 0
    };
  },
  computed: {
    orderedCollabs() {
      return this.collabs ? _.toArray(this.collabs.items) : [];
    },
    orderedRequests() {
      return this.collabRequests ? _.toArray(this.collabRequests.items) : [];
    }
  },
  methods: {
    getTimestamp(timestamp) {
      return DateTime.fromMillis(timestamp.seconds * 1000);
    },
    editCollab(collab) {
      this.selectedCollab = collab;
      this.showModal("edit-friend-group");
    }
  },
  mounted() {}
};
</script>

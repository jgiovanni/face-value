<template>
	<div class="container">
		<div class="row">
			<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ui-block responsive-flex">
					<div class="ui-block-title">
						<b-nav class="nav-tabs calendar-events-tabs">
							<b-nav-item :active="tabIndex === 0" @click="tabIndex = 0">Collabs</b-nav-item>
							<b-nav-item :active="tabIndex === 1" @click="tabIndex = 1">Collab Requests <span class="items-round-little bg-breez">2</span></b-nav-item>
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
				<div class="ui-block">
					<b-tabs class="hide-nav" v-model="tabIndex">
						<b-tab>
							<br>I'm the first fading tab
						</b-tab>
						<b-tab >

							<table class="event-item-table event-item-table-fixed-width">

								<thead>

								<tr>

									<th class="author">
										NOTIFICATION
									</th>

									<th class="location">
										PLACE
									</th>

									<th class="upcoming">
										DATE
									</th>

									<th class="description">
										DESCRIPTION
									</th>

									<th class="users">
										ASSISTANTS
									</th>

									<th class="add-event">

									</th>
								</tr>

								</thead>

								<tbody>
								<tr class="event-item">
									<td class="author">
										<div class="event-author inline-items">
											<div class="author-thumb">
												<img src="img/avatar62-sm.jpg" alt="author">
											</div>
											<div class="author-date">
												<a href="#" class="author-name h6">Mathilda Brinker</a> invited you <br> to an event <a href="#">Reunion Dinner.</a>
											</div>
										</div>
									</td>
									<td class="location">
										<div class="place inline-items">
											<svg class="olymp-add-a-place-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-add-a-place-icon"></use></svg>
											<span>Panucci Restaurant</span>
										</div>
									</td>
									<td class="upcoming">
										<div class="date-event inline-items align-left">
											<svg class="olymp-small-calendar-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-small-calendar-icon"></use></svg>

											<span class="month">Aug 14, 2016 at 7:00pm</span>

										</div>
									</td>
									<td class="description">
										<p class="description">Hey! I thought we could all get together and grab something to eat to remember old times!</p>
									</td>
									<td class="users">
										<ul class="friends-harmonic">
											<li>
												<a href="#">
													<img src="img/friend-harmonic5.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic10.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic7.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic8.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic2.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#" class="all-users bg-breez">+24</a>
											</li>
										</ul>
									</td>
									<td class="add-event">
										<a href="20-CalendarAndEvents-MonthlyCalendar.html" class="btn btn-breez btn-sm">Add to Calendar</a>
										<a href="#" class="btn btn-sm btn-border-think custom-color c-grey">Decline / Delete</a>
									</td>
								</tr>
								<tr class="event-item">
									<td class="author">
										<div class="event-author inline-items">
											<div class="author-thumb">
												<img src="img/avatar78-sm.jpg" alt="author">
											</div>
											<div class="author-date">
												<a href="#" class="author-name h6">Walter Havock </a>invited you to <br> an event <a href="#"> Daydreamz New <br> Year’s Party.</a>
											</div>
										</div>
									</td>
									<td class="location">
										<div class="place inline-items">
											<svg class="olymp-add-a-place-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-add-a-place-icon"></use></svg>
											<span>Daydreamz Agency</span>
										</div>
									</td>
									<td class="upcoming">
										<div class="date-event inline-items align-left">
											<svg class="olymp-small-calendar-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-small-calendar-icon"></use></svg>

											<span class="month">Dec 29, 2016 at 7:00pm</span>

										</div>
									</td>
									<td class="description">
										<p class="description">Let’s celebrate the new year together! We are organizing a big party for all the agency...</p>
									</td>
									<td class="users">
										<ul class="friends-harmonic">
											<li>
												<a href="#">
													<img src="img/friend-harmonic5.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic10.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic7.jpg" alt="friend">
												</a>
											</li>
											<li>
												<a href="#">
													<img src="img/friend-harmonic8.jpg" alt="friend">
												</a>
											</li>

										</ul>
									</td>
									<td class="add-event">
										<a href="20-CalendarAndEvents-MonthlyCalendar.html" class="btn btn-breez btn-sm">Add to Calendar</a>
										<a href="#" class="btn btn-sm btn-border-think custom-color c-grey">Decline / Delete</a>
									</td>
								</tr>
								</tbody>
							</table>
						</b-tab>
					</b-tabs>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.hide-nav {
  .nav-tabs {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-item {
    width: auto !important;
  }
  .calendar-events-tabs .nav-item + .nav-item {
    margin-left: 20px !important;
  }
}
</style>
<script type="text/javascript">
import _ from "lodash";
import { mapState } from "vuex";
import Collab from "../mixins/collab";

export default {
  name: "Collabs",
  mixins: [Collab],
  data() {
    return {
      activeTab: null,
      tabIndex: 0
    };
  },
  computed: {
    ...mapState(["collabs", "collabRequests"]),
  },
	methods: {},
  mounted() {}
};
</script>

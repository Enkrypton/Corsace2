<template>
    <div class="schedule">
        <div class="schedule_main_content">
            <OpenTitle>
                SCHEDULE - <span class="schedule_main_content__abbreviation">{{ selectedStage?.abbreviation.toUpperCase() || '' }}</span>
                <template #right>
                    <StageSelector
                        :not-beginning="selectedStage?.ID !== stageList[0]?.ID"
                        :not-end="selectedStage?.ID !== stageList[stageList.length - 1]?.ID"
                        @prev="index--"
                        @next="index++"
                    >
                        <template #text>
                            {{ $t("open.components.stageSelector") }}
                        </template>

                        <template #stage>
                            {{ selectedStage?.abbreviation.toUpperCase() || '' }}
                        </template>
                    </StageSelector>
                    <!-- TODO: NOT MAKE THIS A STATIC LINK LOL -->
                    <ContentButton
                        class="content_button--red"
                        :link="'https://docs.google.com/spreadsheets/d/1f2538nh9McAii15EJkHU18fi65ICQihxsmvTK-qhA0w'"
                        :img-src="require('../../Assets/img/site/open/mappool/sheets-ico.svg')"
                        external
                    >
                        {{ $t('open.qualifiers.mappool.sheets') }}
                    </ContentButton>
                </template>
            </OpenTitle>
            <div class="schedule_main_content_matches">
                <ScheduleMatchBox
                    v-for="matchup in matchupList"
                    :key="matchup.ID"
                    :matchup="matchup"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import OpenTitle from "../../Assets/components/open/OpenTitle.vue";
import StageSelector from "../../Assets/components/open/StageSelector.vue";
import ScheduleMatchBox from "../../Assets/components/open/ScheduleMatchBox.vue";
import ContentButton from "../../Assets/components/open/ContentButton.vue";

import { Tournament } from "../../Interfaces/tournament";
import { Stage, StageType } from "../../Interfaces/stage";
import { MatchupList } from "../../Interfaces/matchup";

const openModule = namespace("open");

@Component({
    components: {
        StageSelector,
        OpenTitle,
        ScheduleMatchBox,
        ContentButton,
    },
    head () {
        return {
            title: this.$store.state.open.title,
            meta: [
                {hid: "description", name: "description", content: this.$store.state.open.tournament?.description || ""},

                {hid: "og:site_name", property: "og:site_name", content: this.$store.state.open.title},
                {hid: "og:title", property: "og:title", content: this.$store.state.open.title},
                {hid: "og:url", property: "og:url", content: `https://open.corsace.io${this.$route.path}`}, 
                {hid: "og:description", property: "og:description", content: this.$store.state.open.tournament?.description || ""},
                {hid: "og:image",property: "og:image", content: require("../../Assets/img/site/open/banner.png")},
                
                {name: "twitter:title", content: this.$store.state.open.title},
                {name: "twitter:description", content: this.$store.state.open.tournament?.description || ""},
                {name: "twitter:image", content: require("../../Assets/img/site/open/banner.png")},
                {name: "twitter:image:src", content: require("../../Assets/img/site/open/banner.png")},
            ],
            link: [{rel: "canonical", hid: "canonical", href: `https://open.corsace.io${this.$route.path}`}],
        };
    },
})
export default class Schedule extends Vue {
    
    @openModule.State tournament!: Tournament | null;
    @openModule.State matchupList!: MatchupList[] | null;

    stageList: Stage[] = [];
    index = 0;
    
    get selectedStage (): Stage | null {
        return this.stageList[this.index] || null;
    }

    @Watch("selectedStage")
    async stageMatchups () {
        if (!this.selectedStage) {
            this.$store.commit("open/setMatchups", []);
            return;
        }
        
        const ID = this.selectedStage.ID;
        this.$store.commit("open/setMatchups", []);

        await this.pause(500);
        if (ID !== this.selectedStage.ID) return;

        await this.$store.dispatch("open/setMatchups", this.selectedStage?.ID);
    }

    async pause (ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    mounted () {
        this.stageList = this.tournament?.stages.filter(stage => stage.stageType !== StageType.Qualifiers) ?? [];
        this.index = this.stageList.findIndex(stage => stage.timespan.end.getTime() > Date.now());
        if (this.index === -1)
            this.index = this.stageList.length - 1;
    }
}

</script>

<style lang="scss">
@import '@s-sass/_variables';

.schedule {

    &_main_content {
        display: flex;
        align-self: center;
        justify-content: center;
        flex-direction: column;
        width: 75vw;
        position: relative;
        padding: 35px;

        &__abbreviation {
            color: $open-red;
        }

        @media screen and (max-width: $breakpoint-xl) {
            width: 100vw;
        }

        &_matches{
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            gap: 20px;
        }
    }
}
</style>
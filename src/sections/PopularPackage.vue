<template>
  <section class="popular-package">
    <h2 class="mt-5">TOP-100</h2>

    <ul class="nav nav-tabs mt-4">
      <template v-for="(period, index) in PERIOD_POPULAR_PACKAGE" :key="index">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: selectPeriod === period }"
            @click="changePeriod(period)"
          >
            {{ transformText(period, 'firstUpper') }}
          </button>
        </li>
      </template>
    </ul>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Name</th>
          <th scope="col">Hits</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(p, index) in listPackage[selectPeriod]" :key="index">
          <tr>
            <th scope="row">{{ index + 1 }}</th>
            <td class="package-type" :class="p.type">
              <IconNPM v-if="p.type === PACKAGE_TYPE.npm" />
              <IconGitHub v-else/>
            </td>
            <td>{{ p.name }}</td>
            <td>{{ p.hits }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IconNPM from '@/common/icons/IconNPM.vue';
import IconGitHub from '@/common/icons/IconGitHub.vue';

import { transformText } from '@/utils';

import { PACKAGE_TYPE } from '@/interfaces/other.interface';

enum PERIOD_POPULAR_PACKAGE {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

interface ResponsePopularPackage {
  type: PACKAGE_TYPE;
  name: string;
  hits: number;
  bandwidth: number;
}

@Options({
  components: {
    IconNPM,
    IconGitHub,
  },
  props: {

  },
})
export default class PopularPackage extends Vue {
  public PACKAGE_TYPE = PACKAGE_TYPE;

  public PERIOD_POPULAR_PACKAGE = PERIOD_POPULAR_PACKAGE;

  public transformText = transformText;

  public selectPeriod = PERIOD_POPULAR_PACKAGE.day;

  public listPackage: { [x: string]: ResponsePopularPackage[] } = {
    day: [],
    week: [],
    month: [],
    year: [],
  };

  public changePeriod(period: PERIOD_POPULAR_PACKAGE): void {
    this.selectPeriod = period;

    this.getPopularPackage();
  }

  private getPopularPackage(): void {
    fetch(`https://data.jsdelivr.com/v1/stats/packages/${this.selectPeriod}`)
      .then((res) => res.json())
      .then((data: ResponsePopularPackage[]) => {
        this.listPackage[this.selectPeriod] = data;
      });
  }

  created(): void {
    this.getPopularPackage();
  }
}
</script>

<style lang="scss">
.popular-package {
  table {
    tbody {
      tr {
        &:nth-child(1) {
          background-color: $gold;
        }

        &:nth-child(2) {
          background-color: $silver;
        }

        &:nth-child(3) {
          background-color: $bronze;
        }

        td {
          &.package-type {
            &.npm {
              svg {
                @include strict_size(14px, 36px);
              }
            }

            &.gh {
              svg {
                @include strict_size(24px, 24px);
              }
            }
          }
        }
      }
    }
  }
}
</style>

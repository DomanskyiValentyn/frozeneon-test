<template>
  <div class="modal fade" tabindex="-1" id="package-detail" aria-labelledby="modal-package-detail" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" v-if="$props?.package">
        <div class="modal-header">
          <h5 class="modal-title">{{ $props?.package?.package?.name }}@{{ $props.package.package.version }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ $props.package.package.description }}</p>

          <dl class="row mt-3">
            <dt class="col-sm-3">Install</dt>
            <dd class="d-flex col-sm-9 links">
              <button class="button-copy" ref="copy" @click="copy">{{ npmInstallText }} <IconClipboard/></button>
            </dd>

            <dt class="col-sm-3 mt-2">Links</dt>
            <dd class="d-flex mt-2 col-sm-9 links">
              <a :href="$props.package.package.links.npm" target="_blank"><IconNPM /></a>
              <a :href="$props.package.package.links.repository" target="_blank"><IconGitHub /></a>
              <a :href="$props.package.package.links.homepage" target="_blank"><IconLink /></a>
            </dd>

            <template v-if="$props.package.package?.author">
              <dt class="col-sm-3 mt-3">Author</dt>
              <dd class="col-sm-9 mt-3">
                <a :href="`mailto:${$props.package.package?.author.email}`">
                  {{ $props.package.package?.author.name }}
                </a>
              </dd>
            </template>

            <template v-if="$props.package.package?.publisher">
              <dt class="col-sm-3 mt-2">Publisher</dt>
              <dd class="col-sm-9 mt-3">
                <a :href="`mailto:${$props.package.package?.publisher.email}`">
                  {{ $props.package.package?.publisher.username }}
                </a>
              </dd>
            </template>

            <template v-if="$props.package.package?.maintainers?.length">
              <dt class="col-sm-3 mt-2">Maintainers</dt>
              <dd class="col-sm-9 mt-2">
                <template v-for="(maintainer, index) in $props.package.package?.maintainers" :key="index">
                  <a class="me-2" :href="`mailto:${maintainer.email}`">{{ maintainer.username }}</a>
                </template>
              </dd>
            </template>

            <template v-if="$props.package.package?.keywords?.length">
              <dt class="col-sm-3 mt-3">Keywords</dt>
              <dd class="col-sm-9 mt-3">{{ $props.package.package?.keywords?.join(', ') }}</dd>
            </template>

          </dl>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Clipboard from 'clipboard';

import IconGitHub from '@/common/icons/IconGitHub.vue';
import IconLink from '@/common/icons/IconLink.vue';
import IconNPM from '@/common/icons/IconNPM.vue';
import IconClipboard from '@/common/icons/IconClipboard.vue';
import { SearchPackageObjects } from '@/interfaces/other.interface';

@Options({
  components: {
    IconGitHub,
    IconLink,
    IconNPM,
    IconClipboard,
  },
  props: {
    package: Object,
  },
})
export default class ModalPackageDetail extends Vue {
  declare $props: {
    package: SearchPackageObjects;
  }

  declare $refs: {
    copy: HTMLButtonElement;
  }

  get npmInstallText(): string {
    return `npm i ${this.$props.package.package.name}`;
  }

  public copy(): void {
    Clipboard.copy(this.npmInstallText, { container: this.$refs.copy });
  }
}
</script>

<style lang="scss">
#package-detail {
  .package-detail {
    &__tags {
      p {
        background-color: $gold;
      }
    }
  }

  .modal-body {
    dl {
      dd {
        button.button-copy {
          display: flex;
          align-items: center;
          justify-content: center;

          white-space: nowrap;

          border:none;

          background: none;

          padding: 0;

          &, & * {
            transition: 0.2s all;
          }

          svg {
            margin-left: 10px;

            @include strict_size(16px, 16px);
          }

          &:hover {
            color: $blue;

            svg {
              path {
                fill: $blue;
              }
            }
          }
        }

        &.links {
          a {
            margin-right: .5rem;

            svg {
              @include strict_size(24px, false);

              &.icon-npm {
                @include strict_size(16px, 40px);
              }
            }
          }
        }
      }
    }
  }
}
</style>

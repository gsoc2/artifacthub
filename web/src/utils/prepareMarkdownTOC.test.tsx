import { TOCEntryItem } from '../types';
import prepareMarkdownTOC from './prepareMarkdownTOC';

interface Test {
  input: string;
  output: TOCEntryItem[];
}

const tests: Test[] = [
  {
    input: '',
    output: [],
  },
  {
    input: '\n# Title 1\n## Subtitle 1',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# **Title 1** \n## Subtitle 1',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# _Title 1_\n# Title 2',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [],
      },
      {
        depth: 1,
        value: 'Title 2',
        children: [],
      },
    ],
  },
  {
    input: '\n# Title 1\n## Subtitle 1\n# Title 2',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
      {
        depth: 1,
        value: 'Title 2',
        children: [],
      },
    ],
  },
  {
    input: '\n# Title 1\n## Subtitle 1\n# Title 2\n## Subtitle 2',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
      {
        depth: 1,
        value: 'Title 2',
        children: [
          {
            depth: 2,
            value: 'Subtitle 2',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# Title 1\n### Subtitle 1\n### Subtitle 2',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 3,
            value: 'Subtitle 1',
            children: [],
          },
          {
            depth: 3,
            value: 'Subtitle 2',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# Title 1\n### Opt 1\n## Subtitle 1',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 3,
            value: 'Opt 1',
            children: [],
          },
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# Title 1\n## Subtitle 1a\n### Opt 1\n### Opt 2\n## Subtitle 1b\n# Title 2\n## Subtitle 2',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1a',
            children: [
              {
                depth: 3,
                value: 'Opt 1',
                children: [],
              },
              {
                depth: 3,
                value: 'Opt 2',
                children: [],
              },
            ],
          },
          {
            depth: 2,
            value: 'Subtitle 1b',
            children: [],
          },
        ],
      },
      {
        depth: 1,
        value: 'Title 2',
        children: [
          {
            depth: 2,
            value: 'Subtitle 2',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: 'Title 1\n====\nSubtitle 1\n----\n',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# Title 1\n## `Subtitle 1`',
    output: [
      {
        depth: 1,
        value: 'Title 1',
        children: [
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input:
      '![Version: 0.2.0](https://img.shields.io/badge/Version-0.2.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2.2.0](https://img.shields.io/badge/AppVersion-2.2.0-informational?style=flat-square)\n\nA Helm chart for loki Mixin\n\n**Homepage:** <https://charts.portefaix.xyz>\n\n## Maintainers\n\n| Name | Email | Url |\n| ---- | ------ | --- |\n| nlamirault | nicolas.lamirault@gmail.com |  |\n\n## Source Code\n\n* <https://github.com/nlamirault/portefaix-hub/tree/master/charts/loki-mixin>\n\n## Values\n\n| Key | Type | Default | Description |\n|-----|------|---------|-------------|\n| additionalAnnotations | | `{}` | Additional annotations to add to the Prometheus rules |\n| additionalLabels | | `{}` | Additional labels to add to the Prometheus rules |\n| fullnameOverride | string | `""` | Provide a name to substitute for the full names of resources |\n\n----------------------------------------------\nAutogenerated from chart metadata using [helm-docs v1.4.0](https://github.com/norwoodj/helm-docs/releases/v1.4.0)\n',
    output: [
      {
        depth: 2,
        value: 'Maintainers',
        children: [],
      },
      {
        depth: 2,
        value: 'Source Code',
        children: [],
      },
      {
        depth: 2,
        value: 'Values',
        children: [],
      },
    ],
  },
  {
    input:
      '\n\nApp Mesh Gateway Helm chart for Kubernetes. \n\n## Prerequisites\n\n* App Mesh CRDs\n* App Mesh Manager >= 1.0.0\n\n**Note** App Mesh Gateway is a release candidate and can be used by\nenabling App Mesh preview features (available only in us-west-2 region).\n\nTo enable the preview features:\n\n* When configuring IAM policies, use `appmesh-preview` as the service name instead of `appmesh`\n* Install the App Mesh CRDs with:\n```sh\nkubectl apply -k github.com/aws/eks-charts/stable/appmesh-controller//crds?ref=preview\n```\n* Install the App Mesh Controller chart from the preview branch\n* When configuring pods, add the following annotation so Envoy sidecars point to the preview as well:\n```yaml\nannotations:\n  appmesh.k8s.aws/preview: enabled\n```\n\n## Installing the Chart\n\nAdd the EKS repository to Helm:\n\n```sh\nhelm repo add eks https://aws.github.io/eks-charts\n```\n\nCreate a namespace with injection enabled:\n\n```sh\nkubectl create ns appmesh-ingress\nkubectl label namespace appmesh-ingress appmesh.k8s.aws/sidecarInjectorWebhook=enabled\n```\n\nDeploy the App Mesh Gateway in the `appmesh-ingress` namespace:\n\n```sh\nhelm upgrade -i appmesh-gateway eks/appmesh-gateway \\\n--namespace appmesh-ingress\n```\n\nFind the NLB address:\n\n```sh\nkubectl get svc appmesh-gateway -n appmesh-ingress\n```\n\nThe [configuration](#configuration) section lists the parameters that can be configured during installation.\n\n## Configure auto-scaling\n\nInstall the Horizontal Pod Autoscaler (HPA) metrics server:\n\n```sh\nhelm upgrade -i metrics-server stable/metrics-server \\\n--namespace kube-system \\\n--set args[0]=--kubelet-preferred-address-types=InternalIP\n```\n\nConfigure CPU requests for the gateway pods and enable HPA by setting an average CPU utilization per pod:\n\n```sh\nhelm upgrade -i appmesh-gateway eks/appmesh-gateway \\\n--namespace appmesh-ingress \\\n--set hpa.enabled=true \\\n--set hap.minReplicas=2 \\\n--set hap.maxReplicas=5 \\\n--set hap.averageUtilization=90 \\\n--set resources.requests.cpu=1000m\n```\n\n## Uninstalling the Chart\n\nTo uninstall/delete the `appmesh-gateway` deployment:\n\n```console\n$ helm delete appmesh-gateway -n appmesh-ingress\n```\n\nThe command removes all the Kubernetes components associated with the chart and deletes the release.\n\n## Configuration\n\nThe following tables lists the configurable parameters of the chart and their default values.\n\nParameter | Description | Default\n--- | --- | ---\n`image.repository` | image repository | `840364872350.dkr.ecr.us-west-2.amazonaws.com/aws-appmesh-envoy`\n`image.tag` | image tag | `<VERSION>`\n`image.pullPolicy` | image pull policy | `IfNotPresent`\n`skipImageOverride` | when enabled the App Mesh injector will not override the Envoy image | `false`\n`service.type` | service type  | `LoadBalancer`\n`service.port` | service port  | `80`\n`service.annotations` | service annotations | NLB load balancer type\n`service.externalTrafficPolicy` | when set to `Local` it preserves the client source IP  | `Cluster`\n`appmesh.gateway` | create a `VirtualGateway`  | `true`\n`appmesh.preview` | enable App Mesh Preview (us-west-2 only)  | `false`\n`resources.requests/cpu` | pod CPU request | `100m`\n`resources.requests/memory` | pod memory request | `64Mi`\n`hpa.enabled` | enabled CPU based auto-scaling | `false`\n`hpa.minReplicas` | minimum number of replicas | `2`\n`hpa.maxReplicas` | maximum number of replicas | `5`\n`hpa.averageUtilization` | CPU average utilization percentage | `90`\n`hpa.enabled` | enabled CPU based auto-scaling | `false`\n`podAntiAffinity` | soft pod anti-affinity, one replica per node | `true`\n`podAnnotations` | annotations to add to each pod | `{}`\n`nodeSelector` | node labels for pod assignment | `{}`\n`tolerations` | list of node taints to tolerate | `[]`\n`rbac.pspEnabled` | If `true`, create and use a restricted pod security policy | `false`\n`serviceAccount.create` | If `true`, create a new service account | `true`\n`serviceAccount.name` | Service account to be used | None\n',
    output: [
      {
        depth: 2,
        value: 'Prerequisites',
        children: [],
      },
      {
        depth: 2,
        value: 'Installing the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Configure auto-scaling',
        children: [],
      },
      {
        depth: 2,
        value: 'Uninstalling the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Configuration',
        children: [],
      },
    ],
  },
  {
    input:
      "\n\nSingle sign-on for your Kubernetes services using Google OAuth (more providers are welcomed)\n\n- [Blogpost](https://tech.buzzfeed.com/unleashing-the-a6a1a5da39d6?gi=e6db395406ae)\n- [Quickstart guide](https://github.com/buzzfeed/sso/blob/master/docs/quickstart.md)\n- [SSO in Kubernetes with Google Auth](https://medium.com/@while1eq1/single-sign-on-for-internal-apps-in-kubernetes-using-google-oauth-sso-2386a34bc433)\n- [Repo](https://github.com/buzzfeed/sso)\n\nThis helm chart is heavily inspired in [Buzzfeed's example](https://github.com/buzzfeed/sso/tree/master/quickstart/kubernetes), and provides a way of protecting Kubernetes services that have no authentication layer globally from a single OAuth proxy.\n\nMany of the Kubernetes OAuth solutions require to run an extra container within the pod using [oauth2_proxy](https://github.com/bitly/oauth2_proxy), but the project seems to not be maintained anymore. The approach presented on this chart allows to have a global OAuth2 Proxy that can protect services even in different namespaces, thanks to [Kube DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).\n\nWe use this chart in production at [MindDoc](https://minddoc.de) for protecting endpoints that have no built-in authentication (or that would require to run inner containers), like `Kibana`, `Prometheus`, etc...\n\n## Introduction\n\nThis chart creates a SSO deployment on a [Kubernetes](http://kubernetes.io)\ncluster using the [Helm](https://helm.sh) package manager.\n\n## Prerequisites\n\n- Kubernetes 1.8with Beta APIs enabled\n- Kube DNS\n\n## Installing the Chart\n\nTo install the chart with the release name `my-release`:\n\n```bash\nhelm repo add minddoc https://minddocdev.github.io/charts\nhelm install --name my-release minddoc/buzzfeed-sso\n```\n\nThe command deploys SSO on the Kubernetes cluster using the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.\n\nThis chart has required variables, see [Configuration](#configuration).\n\n## Uninstalling the Chart\n\nTo uninstall/delete the `my-release` deployment:\n\n```bash\nhelm delete --purge my-release\n```\n\nThe command removes all the Kubernetes components associated with the chart and deletes the release.\n\n## Configuration\n\nThe following table lists the configurable parameters of the SSO chart and their default/required values.\n\nParameter | Description | Default\n--- | --- | ---\n`namespace` | namespace to use | `default`\n`emailDomain` | the sso email domain for authentication | REQUIRED\n`rootDomain` | the parent domain used for protecting your backends | REQUIRED\n`whitelistedEmails` | comma-seperated list of emails which should be whitelisted | OPTIONAL\n`cluster` | the cluster name for SSO | `dev`\n`auth.enabled` | enable auth component | `true`\n`auth.annotations` | extra annotations for auth pods | `{}`\n`auth.domain` | the auth domain used for OAuth callbacks | REQUIRED\n`auth.extraEnv` | extra auth env vars | `[]`\n`auth.replicaCount` | desired number of auth pods | `1`\n`auth.resources` | resource limits and requests for auth pods | `{ limits: { memory: \"256Mi\", cpu: \"200m\" }}`\n`auth.nodeSelector` | node selector logic for auth pods | `{}`\n`auth.tolerations` | resource tolerations for auth pods | `{}`\n`auth.affinity` | node affinity for auth pods | `{}`\n`auth.service.type` | type of auth service to create | `ClusterIP`\n`auth.service.port` | port for the http auth service | `80`\n`auth.secret` | secrets to be generated randomly with `openssl rand -base64 32 | head -c 32`. | REQUIRED if `auth.customSecret` is not set\n`auth.ingressEnabled` | enable auth ingress. | `true`\n`auth.ingressPath` | auth ingress path. | `/`\n`auth.tls` | tls configuration for central sso auth ingress. | `{}`\n`auth.customSecret` | the secret key to reuse (avoids secret creation via helm) | REQUIRED if `auth.secret` is not set\n`proxy.enabled` | enable proxy component | `true`\n`proxy.annotations` | extra annotations for proxy pods | `{}`\n`proxy.providerUrlInternal` | url for split dns deployments |\n`proxy.extraEnv` | extra proxy env vars | `[]`\n`proxy.replicaCount` | desired number of proxy pods | `1`\n`proxy.resources` | resource limits and requests for proxy pods | `{ limits: { memory: \"256Mi\", cpu: \"200m\" }}`\n`proxy.nodeSelector` | node selector logic for proxy pods | `{}`\n`proxy.tolerations` | resource tolerations for proxy pods | `{}`\n`proxy.affinity` | node affinity for proxy pods | `{}`\n`proxy.service.type` | type of proxy service to create | `ClusterIP`\n`proxy.service.port` | port for the http proxy service | `80`\n`proxy.secret` | secrets to be generated randomly with `openssl rand -base64 32 | head -c 32 | base64`. | REQUIRED if `proxy.customSecret` is not set\n`proxy.customSecret` | the secret key to reuse (avoids secret creation via helm) | REQUIRED if `proxy.secret` is not set\n`proxy.defaultAllowedEmailDomains` | the default allowed domains for upstreams | ``\n`provider.google` | the Oauth provider to use (only Google support for now) | REQUIRED\n`provider.google.adminEmail` | the Google admin email | `undefined`\n`provider.google.slug` | the Google provider slug | `oauth2`\n`provider.google.secret` | the Google OAuth secrets | REQUIRED if `provider.google.customSecret` is not set\n`provider.google.customSecret` | the secret key to reuse instead of creating it via helm | REQUIRED if `provider.google.secret` is not set\n`image.repository` | container image repository | `buzzfeed/sso`\n`image.tag` | container image tag | `v2.1.0`\n`image.pullPolicy` | container image pull policy | `IfNotPresent`\n`ingress.enabled` | set to true to enable the ingress | `true`\n`ingress.annotations` | ingress load balancer annotations | `{}`\n`ingress.extraLabels` | extra ingress labels | `{}`\n`ingress.hosts` | proxied hosts | `[]`\n`ingress.tls` | tls certificates for the proxied hosts | `[]`\n`ingress.gcpBackendConfig` | GCP LB backend service configuration | `{}`\n`upstreams` | configuration of services that use sso | `[]`\n\nSpecify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,\n\n```bash\nhelm install --name my-release \\\n  --set key_1=value_1,key_2=value_2 \\\n  minddoc/buzzfeed-sso\n```\n\nAlternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,\n\n```bash\nhelm install --name my-release -f values.yaml minddoc/buzzfeed-sso\n```\n\n> **Tip**: This will merge parameters with [values.yaml](values.yaml), which does not specify all the required values\n\n### Example\n\n**NEVER expose your `auth.secret`, `proxy.secret`, `provider.google.clientId`, `provider.google.clientSecret` and `provider.google.serviceAccount`.** Always keep them in a safe place and do not push them to any repository. As values are merged, you can always generate a different `.yaml` file. For instance:\n\n```yaml\n# values.yaml\nemailDomain: 'email.coolcompany.foo'\n\nrootDomain: 'coolcompany.foo'\n\nauth:\n  domain: sso-auth.coolcompany.foo\n\nproxy:\n  cluster: dev\n\ngoogle:\n  adminEmail: iamtheadmin@email.coolcompany.foo\n```\n\n```yaml\n# secrets.yaml\nauth:\n secret:\n    codeSecret: 'randomSecret1'\n    cookieSecret: 'randomSecret2'\n\nproxy:\n  secret:\n    clientId: 'randomSecret3'\n    clientSecret: 'randomSecret4'\n    cookieSecret: 'randomSecret6'\n\ngoogle:\n  secret:\n    clientId: 'googleSecret!'\n    clientSecret: 'evenMoreSecret'\n    serviceAccount: '{ <json content super secret> }'\n```\n\nTherefore, you could push your own `values.yaml` to a repo and keep `secrets.yaml` locally safe, and then install/update the chart:\n\n```bash\nhelm install --name my-release -f values.yaml -f secrets.yaml minddoc/buzzfeed-sso\n```\n\nAlternatively, you can specify your own secret key, if you have already created it in the cluster. The secret should follow the data format defined in `secret.yaml` (auth and proxy) and `google-secret.yaml` (google provider).\n\n```yaml\n# values.yaml\nemailDomain: 'email.coolcompany.foo'\n\nrootDomain: 'coolcompany.foo'\n\nauth:\n  domain: sso-auth.coolcompany.foo\n  customSecret: my-sso-auth-secret\n\nproxy:\n  cluster: dev\n  customSecret: my-sso-proxy-secret\n\nprovider:\n  google:\n    adminEmail: iamtheadmin@email.coolcompany.foo\n    customSecret: my-sso-google-secret\n```\n\n## Updating the Chart\n\nYou can update the chart values and trigger a pod reload. If the configmap changes, it will automatically retrieve the new values.\n\n```bash\nhelm upgrade -f values.yaml my-release minddoc/buzzfeed-sso\n```\n\n## Contributors\n\nThis is the list of contributors to the original [incubator/buzfeed-sso](https://github.com/helm/charts/tree/master/incubator/buzzfeed-sso) chart:\n\n- @anas-aso\n- @cameronattard\n- @darioblanco\n- @dpeckett\n- @komljen\n- @nicolaspearson\n- @namm2\n- @omerlh\n- @StiviiK\n- @tuanahnguyen-ct\n- @willejs\n\nNew contributors are always welcomed!\n",
    output: [
      {
        depth: 2,
        value: 'Introduction',
        children: [],
      },
      {
        depth: 2,
        value: 'Prerequisites',
        children: [],
      },
      {
        depth: 2,
        value: 'Installing the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Uninstalling the Chart',
        children: [],
      },
      {
        children: [
          {
            depth: 3,
            value: 'Example',
            children: [],
          },
        ],
        depth: 2,
        value: 'Configuration',
      },
      {
        depth: 2,
        value: 'Updating the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Contributors',
        children: [],
      },
    ],
  },
  {
    input:
      '\n\nA set of rules to detect SSH connections\n\n## Inbound SSH Connection\nDetects inbound SSH connection\n## Outbound SSH Connection\nDetects outbound SSH connection\n# Rules\n',
    output: [
      {
        depth: 2,
        value: 'Inbound SSH Connection',
        children: [],
      },
      {
        depth: 2,
        value: 'Outbound SSH Connection',
        children: [],
      },
      {
        depth: 1,
        value: 'Rules',
        children: [],
      },
    ],
  },
  {
    input:
      'Atlassian Confluence Server\n\n[Confluence](https://www.atlassian.com/software/confluence) is a collaboration software program developed and published by the australian software company **Atlassian**.\n\n## TL;DR;\n\nAll commands below are Helm v3\n\n```console\n$ helm repo add mox https://helm.mox.sh\n$ helm repo update\n$ helm install my-release mox/confluence-server\n```\n\n## Introduction\n\nThis chart bootstraps a [Confluence server](https://hub.docker.com/r/atlassian/confluence-server/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.\n\nIt is available on:\n * [helm.mox.sh](https://helm.mox.sh)\n * [hub.helm.sh](https://hub.helm.sh/charts/mox/confluence-server)\n * [hub.kubeapps.com](https://hub.kubeapps.com/charts/mox/confluence-server)\n\n## Prerequisites\n\n- Kubernetes 1.12+\n- Helm 2.11or Helm 3.0-beta3+\n- PV provisioner support in the underlying infrastructure (Only when persisting data)\n- At least 1GB Memory\n\n## Installing the Chart\n\nThis chart is not available in the Helm repositories. To install the chart first you need to add this Helm repository:\n\n```console\n$ helm repo add mox https://helm.mox.sh\n$ helm repo update\n```\n\nTo deploy it with the release name `my-release` run:\n\n```console\n$ helm install my-release mox/confluence-server\n```\n\nThe command deploys **Confluence server** on the Kubernetes cluster in the default configuration. The [configuration parameters](#parameters) section lists the parameters that can be configured during installation.\n\n## Uninstalling the Chart\n\nTo uninstall/delete the `my-release` deployment:\n\n```console\n$ helm uninstall my-release\n```\n\nThe command removes (almost) all the Kubernetes components associated with the chart and deletes the release. See [PostgreSQL enabled](#uninstall-with-postgres-enabled) for more details.\n\n## Upgrading the Chart\n\nTo upgrade the `my-release` deployment when there was **no** PostgreSQL deployed just run:\n\n```console\n$ helm upgrade my-release\n```\n\nOtherwise, see [Upgrade Confluence server with PostgreSQL enabled](#upgrade-with-postgres-enabled) for more details.\n\n## <a name="postgres-enabled"></a> PostgreSQL enabled\n\nThis chart deploys **by default** a [bitnami PostgreSQL](https://github.com/bitnami/charts/tree/master/bitnami/postgresql) instance.\n\n### <a name="install-with-postgres-enabled"></a>Install Confluence server with PostgreSQL enabled\n\nPostgreSQL Chart from **bitnami** generates a random password if we do not specify one. Random or not, keep the password safe because it will be needed when upgrading Confluence.\n\nTo specify a password:\n```console\n$ helm install my-release \\\n     --set postgresql.postgresqlPassword=[POSTGRESQL_PASSWORD] \\\n     --set postgresql.replication.password=[REPLICATION_PASSWORD] # in case Replication is enabled \\\n     mox/confluence-server\n```\n\n### <a name="uninstall-with-postgres-enabled"></a>Uninstall Confluence server with PostgreSQL enabled\n\nThe Persistent Volume Claim (PVC) of postgres will **NOT** be automatically deleted. It needs to be removed manually:\n\n```console\n$ kubectl delete pvc -l app.kubernetes.io/instance=my-release\n```\n\n### <a name="upgrade-with-postgres-enabled"></a>Upgrade Confluence server with PostgreSQL enabled\n\nFrom [bitnami/postgresql](https://github.com/bitnami/charts/tree/master/bitnami/postgresql#upgrade):\n> It\'s necessary to specify the existing passwords while performing an upgrade to ensure the secrets are not updated with invalid randomly generated passwords.\n\nWe upgrade the `my-release` deployment by running:\n\n```console\n$ helm upgrade my-release \\\n     --set postgresql.postgresqlPassword=[POSTGRESQL_PASSWORD] \\\n     --set postgresql.replication.password=[REPLICATION_PASSWORD] # in case Replication is enabled\n```\n',
    output: [
      {
        depth: 2,
        value: 'TL;DR;',
        children: [],
      },
      {
        depth: 2,
        value: 'Introduction',
        children: [],
      },
      {
        depth: 2,
        value: 'Prerequisites',
        children: [],
      },
      {
        depth: 2,
        value: 'Installing the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Uninstalling the Chart',
        children: [],
      },
      {
        depth: 2,
        value: 'Upgrading the Chart',
        children: [],
      },
      {
        children: [
          {
            depth: 3,
            value: 'Install Confluence server with PostgreSQL enabled',
            children: [],
          },
          {
            depth: 3,
            value: 'Uninstall Confluence server with PostgreSQL enabled',
            children: [],
          },
          {
            depth: 3,
            value: 'Upgrade Confluence server with PostgreSQL enabled',
            children: [],
          },
        ],
        depth: 2,
        value: ' PostgreSQL enabled',
      },
    ],
  },
  {
    input:
      '\n## Upgrading\n\n### From chart < 10.0.0\n\n* Keycloak is updated to 12.0.4\n\nThe upgrade should be seemless.\nNo special care has to be taken.\n\n### From chart versions < 9.0.0\n\nThe Keycloak chart received a major facelift and, thus, comes with breaking changes.\nOpinionated stuff and things that are now baked into Keycloak\'s Docker image were removed.\nConfiguration is more generic making it easier to use custom Docker images that are configured differently than the official one.\n\n* Values are no longer nested under `keycloak`.\n* Besides setting the node identifier, no CLI changes are performed out of the box\n* Environment variables for the Postresql dependency are set automatically if enabled.\n  Otherwise, no environment variables are set by default.\n* Optionally enables creating RBAC resources with configurable rules (e. g. for KUBE_PING)\n* PostgreSQL chart dependency is updated to 9.1.1\n\n### From chart versions < 8.0.0\n\n* Keycloak is updated to 10.0.0\n* PostgreSQL chart dependency is updated to 8.9.5\n\nThe upgrade should be seemless.\nNo special care has to be taken.\n\n### From chart versions < 7.0.0\n\nVersion 7.0.0 update breaks backwards-compatibility with the existing `keycloak.persistence.existingSecret` scheme.\n\n#### Changes in Configuring Database Credentials from an Existing Secret\n\nBoth `DB_USER` and `DB_PASS` are always read from a Kubernetes Secret.\nThis is a requirement if you are provisioning database credentials dynamically - either via an Operator or some secret-management engine.\n\nThe variable referencing the password key name has been renamed from `keycloak.persistence.existingSecretKey` to `keycloak.persistence.existingSecretPasswordKey`\n\nA new, optional variable for referencing the username key name for populating the `DB_USER` env has been added:\n`keycloak.persistence.existingSecretUsernameKey`.\n\nIf `keycloak.persistence.existingSecret` is left unset, a new Secret will be provisioned populated with the `dbUser` and `dbPassword` Helm variables.\n\n###### Example configuration:\n```yaml\nkeycloak:\n  persistence:\n    existingSecret: keycloak-provisioned-db-credentials\n    existingSecretPasswordKey: PGPASSWORD\n    existingSecretUsernameKey: PGUSER\n    ...\n```\n### From chart versions < 6.0.0\n\n#### Changes in Probe Configuration\n\nNow both readiness and liveness probes are configured as strings that are then passed through the `tpl` function.\nThis allows for greater customizability of the readiness and liveness probes.\n\nThe defaults are unchanged, but since 6.0.0 configured as follows:\n\n```yaml\n  livenessProbe: |\n    httpGet:\n      path: {{ if ne .Values.keycloak.basepath "" }}/{{ .Values.keycloak.basepath }}{{ end }}/\n      port: http\n    initialDelaySeconds: 300\n    timeoutSeconds: 5\n  readinessProbe: |\n    httpGet:\n      path: {{ if ne .Values.keycloak.basepath "" }}/{{ .Values.keycloak.basepath }}{{ end }}/realms/master\n      port: http\n    initialDelaySeconds: 30\n    timeoutSeconds: 1\n```\n\nstartup probe was added in 10.2.0 and is configured as follows:\n\n```yaml\n  startupProbe: |\n    httpGet:\n      path: /auth/\n      port: http\n    initialDelaySeconds: 30\n    timeoutSeconds: 1\n    failureThreshold: 60\n    periodSeconds: 5\n```\n\n#### Changes in Existing Secret Configuration\n\nThis can be useful if you create a secret in a parent chart and want to reference that secret.\nApplies to `keycloak.existingSecret` and `keycloak.persistence.existingSecret`.\n\n_`values.yaml` of parent chart:_\n```yaml\nkeycloak:\n  keycloak:\n    existingSecret: \'{{ .Release.Name }}-keycloak-secret\'\n```\n\n#### HTTPS Port Added\n\nThe HTTPS port was added to the pod and to the services.\nAs a result, service ports are now configured differently.\n\n\n### From chart versions < 5.0.0\n\nVersion 5.0.0 is a major update.\n\n* The chart now follows the new Kubernetes label recommendations:\nhttps://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/\n* Several changes to the StatefulSet render an out-of-the-box upgrade impossible because StatefulSets only allow updates to a limited set of fields\n* The chart uses the new support for running scripts at startup that has been added to Keycloak\'s Docker image.\nIf you use this feature, you will have to adjust your configuration\n\nHowever, with the following manual steps an automatic upgrade is still possible:\n\n1. Adjust chart configuration as necessary (e. g. startup scripts)\n1. Perform a non-cascading deletion of the StatefulSet which keeps the pods running\n1. Add the new labels to the pods\n1. Run `helm upgrade`\n\nUse a script like the following to add labels and to delete the StatefulSet:\n\n```console\n#!/bin/sh\n\nrelease=<release>\nnamespace=<release_namespace>\n\nkubectl delete statefulset -n "$namespace" -l app=keycloak -l release="$release" --cascade=false\n\nkubectl label pod -n "$namespace" -l app=keycloak -l release="$release" app.kubernetes.io/name=keycloak\nkubectl label pod -n "$namespace" -l app=keycloak -l release="$release" app.kubernetes.io/instance="$release"\n```\n\n**NOTE:** Version 5.0.0 also updates the Postgresql dependency which has received a major upgrade as well.\nIn case you use this dependency, the database must be upgraded first.\nPlease refer to the Postgresql chart\'s upgrading section in its README for instructions.\n',
    output: [
      {
        depth: 2,
        value: 'Upgrading',
        children: [
          {
            depth: 3,
            value: 'From chart < 10.0.0',
            children: [],
          },
          {
            depth: 3,
            value: 'From chart versions < 9.0.0',
            children: [],
          },
          {
            depth: 3,
            value: 'From chart versions < 8.0.0',
            children: [],
          },
          {
            children: [
              {
                children: [
                  {
                    depth: 6,
                    value: 'Example configuration:',
                    children: [],
                  },
                ],
                depth: 4,
                value: 'Changes in Configuring Database Credentials from an Existing Secret',
              },
            ],
            depth: 3,
            value: 'From chart versions < 7.0.0',
          },
          {
            children: [
              {
                depth: 4,
                value: 'Changes in Probe Configuration',
                children: [],
              },
              {
                depth: 4,
                value: 'Changes in Existing Secret Configuration',
                children: [],
              },
              {
                depth: 4,
                value: 'HTTPS Port Added',
                children: [],
              },
            ],
            depth: 3,
            value: 'From chart versions < 6.0.0',
          },
          {
            depth: 3,
            value: 'From chart versions < 5.0.0',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: `\n# prowlarr\n\n\n\n### [2.3.2](/#2.3.2)\n\n#### Added\n\n- Added icon url\n\n#### Changed\n\n- N/A\n\n#### Removed\n\n- N/A\n\n### [1.0.0]\n\n#### Added\n\n- N/A\n\n#### Changed\n\n- N/A\n\n#### Removed\n\n- N/A\n\n[2.3.2]: #2.3.2\n[1.0.0]: #1.0.0`,
    output: [
      {
        depth: 1,
        value: 'prowlarr',
        children: [
          {
            children: [
              {
                depth: 4,
                value: 'Added',
                children: [],
              },
              {
                depth: 4,
                value: 'Changed',
                children: [],
              },
              {
                depth: 4,
                value: 'Removed',
                children: [],
              },
            ],
            depth: 3,
            value: '2.3.2',
          },
          {
            children: [
              {
                depth: 4,
                value: 'Added',
                children: [],
              },
              {
                depth: 4,
                value: 'Changed',
                children: [],
              },
              {
                depth: 4,
                value: 'Removed',
                children: [],
              },
            ],
            depth: 3,
            value: '1.0.0',
          },
        ],
      },
    ],
  },
  {
    input:
      "# Helm Chart for Glowroot\n\nThis is a kubernetes helm chart for Glowroot. It deploys a pod for glowroot-central and one for cassandra database. The glowroot admin section is fully configurable through the values. Ingress is supported as well.\n\n# Content\n<!-- vscode-markdown-toc -->\n* 1. [Prerequisites](#Prerequisites)\n* 2. [Installation](#Installation)\n* 3. [Current Limitation](#CurrentLimitation)\n* 4. [Configuration](#Configuration)\n\t* 4.1. [Image](#Image)\n\t* 4.2. [Service](#Service)\n\t* 4.3. [Glowroot Cassandra](#GlowrootCassandra)\n\t* 4.4. [Glowroot UI](#GlowrootUI)\n\t* 4.5. [Glowroot Admin](#GlowrootAdmin)\n\t* 4.6. [Cassandra](#Cassandra)\n\t\t* 4.6.1. [Ingress](#Ingress)\n\n<!-- vscode-markdown-toc-config\n\tnumbering=true\n\tautoSave=true\n\t/vscode-markdown-toc-config -->\n<!-- /vscode-markdown-toc -->\n\n##  1. <a name='Prerequisites'></a>Prerequisites\n\n* Kubernetes cluster 1.10(should also work on older versions)\n* Helm 2.8.0+\n\n##  2. <a name='Installation'></a>Installation\n\n```\n  helm repo add novum-rgi-helm https://novumrgi.github.io/helm/\n  helm install glowroot novum-rgi-helm/glowroot\n```\n\n##  3. <a name='CurrentLimitation'></a>Current Limitation\n\nSince this image needs to configure the admin part via values this chart is based on a little patch for glowroot.",
    output: [
      {
        children: [],
        depth: 1,
        value: 'Helm Chart for Glowroot',
      },
      {
        children: [
          {
            children: [],
            depth: 2,
            value: '1. Prerequisites',
          },
          {
            children: [],
            depth: 2,
            value: '2. Installation',
          },
          {
            children: [],
            depth: 2,
            value: '3. Current Limitation',
          },
        ],
        depth: 1,
        value: 'Content',
      },
    ],
  },
  {
    input: '\n# <img src="/img" />\n## Opt 1\n## Subtitle 1',
    output: [
      {
        depth: 2,
        value: 'Opt 1',
        children: [],
      },
      {
        depth: 2,
        value: 'Subtitle 1',
        children: [],
      },
    ],
  },
  {
    input: '\n# ![alt text](https://github.com/n48.png "Logo Title")\n## Opt 1\n## Subtitle 1',
    output: [
      {
        depth: 2,
        value: 'Opt 1',
        children: [],
      },
      {
        depth: 2,
        value: 'Subtitle 1',
        children: [],
      },
    ],
  },
  {
    input: '\n# [text link](https://duckduckgo.com) \n## Opt 1\n## Subtitle 1',
    output: [
      {
        depth: 1,
        value: 'text link',
        children: [
          {
            depth: 2,
            value: 'Opt 1',
            children: [],
          },
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    input: '\n# ⋅⋅1. Item \n## Opt 1\n## Subtitle 1',
    output: [
      {
        depth: 1,
        value: '⋅⋅1. Item',
        children: [
          {
            depth: 2,
            value: 'Opt 1',
            children: [],
          },
          {
            depth: 2,
            value: 'Subtitle 1',
            children: [],
          },
        ],
      },
    ],
  },
];

describe('prepareMarkdownTOC', () => {
  for (let i = 0; i < tests.length; i++) {
    it('get TOC', () => {
      const actual = prepareMarkdownTOC(tests[i].input);
      expect(actual).toStrictEqual(tests[i].output);
    });
  }
});

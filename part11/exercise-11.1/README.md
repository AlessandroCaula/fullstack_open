## CI pipeline for a Python project

### __1__) Some common steps in a CI setup include _linting_, _testing_, and _building_. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.

### - _Linting_

A common python linter (2025) that can be used for a CI pipeline for a python project is [Ruff](https://docs.astral.sh/ruff/) by Astral. It's an extremely fast Python linter and code formatter, written in Rust. 

### - _Testing_ 

[Reference](https://testomat.io/blog/popular-python-libraries-to-make-python-testing-more-efficient/#PyUnit_UnitTest)

- __[PyUnit](https://wiki.python.org/moin/PyUnit)__, also known as UnitTest, is a part of the Python standard library, an integrated framework used for writing and running unit tests. It offers users a wide range of features, including test automation and code sharing. It is a built-in library – no additional installations required.

- __[PyTest](https://docs.pytest.org/en/stable/)__ is a common python testing framework for writing small, readable tests cases for testing various scales, from simple unit tests to complex functional tests. It can be easily integrated in the CI pipelines, whether is a JiJenkins, GitHub Actions or other common pipelines. Key Features:
    - __Parallel Testing__: The framework offers specialized plugins (e.g., pytest-xdist) that enable parallel test execution, speeding up the testing process.
    - __Setting Up and Tearing Down Test Environments__: This is possible with PyTest fixtures, which can be shared across multiple tests or even test files.
    - __Parameterized Test Functions__: Users can utilize the @pytest.mark.parametrize decorator to run test functions with different parameters, avoiding code duplication.
    - __Self-Analysis of Assertions__: This feature provides detailed information on failed assertions.
    - __Test Discovery__: PyTest supports automatic discovery of test files and functions based on their naming conventions.
    - __Selective Test Execution__: Users can tag tests with various markers — such as slow or skipped — and run each group of tests separately.

    __Pros__: 

    - Simple syntax and minimal boilerplate code for ease of use.
    - Good integration with other frameworks, CI/CD tools, etc.
    - Wide range of plugins for extending functionality.
    - Detailed reporting for easy problem diagnosis.
    - Scalability and flexibility, allowing for various types of testing.

### - _Building_

[Reference](https://www.lambdatest.com/blog/python-build-tools/)

- __[PyBuilder](https://pybuilder.io/)__ is an open-source Python build tool that manages Python projects. It is a tool designed to enhance the development workflow and simplifies the process of building, testing, and packaging Python applications by offering a declarative way to define jobs and build configurations. PyBuilder, with its focus on simplicity and extensibility, enables developers to maintain organized, effective, and repeatable project builds.

- __[Poetry](https://python-poetry.org/)__ is a modern Python build tool that has grown in popularity due to its emphasis on dependencies, simplicity, and efficient project packaging. Poetry, positioned as an all-in-one solution, seeks to improve the Python development workflow by offering a streamlined and user-friendly method for handling virtual environments, packaging projects, and managing dependencies.

## 2) What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!

[Reference](https://www.atlassian.com/continuous-delivery/continuous-integration/tools)

### Continuous Integration Tools 

1. __[Bitbucket Pipelines](https://www.atlassian.com/software/bitbucket/features/pipelines)__: Is a CI tool directly integrated into Bitbucket, a cloud version control system offered by Atlassian. Bitbucket Pipelines is an easy next step to enable CI if your project is already on Bitbucket. Bitbucket Pipelines are managed as code so you can easily commit pipeline definitions and kick off builds. Bitbucket Pipelines, additionally offers CD. This means projects built with Bitbucket Pipelines can be deployed to production infrastructure as well.

    Features:
    - Easy setup and configuration
    - Unified Bitbucket experience
    - Cloud by 3rd party

2. __[Jenkins](https://www.jenkins.io/)__: Is a veteran CI Tool with a long proven track record. It is open source and driven by community updates. Jenkins is primarily intended to an on-premise installation. Jenkins is a great option when your organization needs on-prem support for handling sensitive customer like HIPAA compliance data.

    Features:
    - On-premise
    - Open source
    - Robust addon/plugin ecosystem

3. __[AWS CodePipeline](https://aws.amazon.com/codepipeline/)__: Is one of the most dominant cloud infrastructure providers in the market. They offer tools and services for all manner of infrastructure and code development tasks. CodePipeline is their CI Tool offering. CodePipeline can directly interface with other existing AWS tools to provide a seamless AWS experience.

    Features: 
    - Fully cloud
    - Integrated with Amazon Web services
    - Custom plugin support
    - Robust access control

4. __[CircleCI](https://circleci.com/)__: Is CI Tool that gracefully pairs with Github, one of the most popular version control system cloud hosting tools. CircleCi is one of the most flexible CI Tools in that it supports a matrix of version control systems, container systems, and delivery mechanisms. CircleCi can be hosted on-premise or used through a cloud offering.

    Features:
    - Notification triggers from CI events
    - Performance optimized for quick builds
    - Easy debugging through SSH and local builds
    - Analytics to measure build performance

5. __[Azure Pipelines](https://azure.microsoft.com)__: Is Microsoft’s cloud infrastructure platform, the Microsoft equivalent to Amazon Web Services. Like the aforementioned AWS CodePipeline, Azure offers a CI Tool that fully integrated into the Azure suite of hosting tools.

    Features:
    - Azure platform integration
    - Windows platform support
    - Container support
    - Github integration

6. __[GitLab](https://about.gitlab.com)__: Is a new CI Tool which offers a full DevOps experience. Gitlab was created with intentions to improve Github’s overall experience. Gitlab offers a modern UX with container support.

    Features:
    - On-prem or cloud hosting
    - Continuous security testing
    - Easy to learn UX

## 3) Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

### Cloud-based CI/CD (GitHub Actions, GitLab, Circle, etc)

__When to use:__

- You want __zero infrastructure maintenance__ (no servers to patch, scale, or monitor).

- Your builds are __not resource-heavy__ (tests, web apps, small/medium backends).

- You are ok with __vendor lock-in__ and cost scaling with usage.

- Your code can run in the provider's environment without security/legal issues.

- Teams want __fast setup__ and integrations with repos.

__Pros__:

- Very fast to start.

- Scales automatically.

- Integrations with cloud services. 

- Cost-effective for small/medium teams.

__Cons__:

- Limited control over build environment.

- Costs can balloon with heavy pipelines.

- Possible security/compliances concerns.

### Self-hosted CI/CD (Jenkins, self-hosted GitLab runners, etc.)

__When to use:__

- You need __tight control__ over environment (special OS, hardware, GPU, HPC cluster, regulated software stack).

- You run __resource-heavy builds/tests__ (ML training, big data processing, simulations).

- Company policies require __on-premise / private infrastructure__ (compliance, data residency, IP protection).

- You want to __optimize costs__ at scale (if you already pay for your own servers).

- You need __custom integrations__ (special runners, hardware, or pipelines)

__Pros__:

- Full control (hardware, network, software)

- Can optimize for performance & cost.

- Works even if external cloud services go down.

__Cons__:

- You own the maintenance (security patches, scaling, monitoring).

- Longer setup time.

- Higher upfront cost.
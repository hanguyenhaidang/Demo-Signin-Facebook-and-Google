```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response 1
Alice <-- Bob: Another authentication 2
Alice <-- Bob: Another authentication 3
@enduml
```
